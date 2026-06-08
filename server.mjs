import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { Readable } from "node:stream";

const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const HOST = "0.0.0.0";
const CLIENT_DIR = resolve(process.cwd(), "dist/client");
const SOURCE_ASSET_DIR = resolve(process.cwd(), "src/assets");
const SERVER_ENTRY_URL = new URL("./dist/server/server.js", import.meta.url);

function log(level, message, details) {
  const prefix = `[render:${level}]`;
  if (details) {
    console[level === "error" ? "error" : "log"](`${prefix} ${message}`, details);
    return;
  }

  console[level === "error" ? "error" : "log"](`${prefix} ${message}`);
}

process.on("uncaughtException", (error) => {
  log("error", "uncaughtException", error);
});

process.on("unhandledRejection", (reason) => {
  log("error", "unhandledRejection", reason);
});

let serverModulePromise;

async function getServerModule() {
  if (!serverModulePromise) {
    serverModulePromise = import(SERVER_ENTRY_URL.href).then((mod) => mod.default ?? mod);
  }

  return serverModulePromise;
}

function getContentType(filePath) {
  switch (extname(filePath).toLowerCase()) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".map":
      return "application/json; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function isWithinDirectory(parent, candidate) {
  const normalizedParent = resolve(parent) + sep;
  const normalizedCandidate = resolve(candidate);
  return normalizedCandidate.startsWith(normalizedParent);
}

async function serveStaticAsset(urlPath) {
  if (urlPath === "/") {
    return null;
  }

  const decodedPath = decodeURIComponent(urlPath);
  const staticRoot = decodedPath.startsWith("/src/assets/") ? SOURCE_ASSET_DIR : CLIENT_DIR;
  const candidatePath = resolve(staticRoot, `.${decodedPath.replace(/^\/src\/assets/, "")}`);

  if (!isWithinDirectory(staticRoot, candidatePath) || !existsSync(candidatePath)) {
    return null;
  }

  const stats = await stat(candidatePath);
  if (!stats.isFile()) {
    return null;
  }

  const body = await readFile(candidatePath);
  const headers = new Headers({
    "content-type": getContentType(candidatePath),
    "content-length": String(body.byteLength),
  });

  if (decodedPath.startsWith("/assets/")) {
    headers.set("cache-control", "public, max-age=31536000, immutable");
  } else if (decodedPath.startsWith("/src/assets/")) {
    headers.set("cache-control", "public, max-age=0, must-revalidate");
  } else {
    headers.set("cache-control", "public, max-age=0, must-revalidate");
  }

  return new Response(body, { status: 200, headers });
}

async function readRequestBody(request) {
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined;
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return Buffer.concat(chunks);
}

async function toWebRequest(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || `localhost:${PORT}`;
  const protocol = (req.headers["x-forwarded-proto"] || "http").split(",")[0];
  const url = new URL(req.url || "/", `${protocol}://${host}`);
  const body = await readRequestBody(req);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      headers.set(key, value.join(", "));
    } else if (typeof value === "string") {
      headers.set(key, value);
    }
  }

  return new Request(url, {
    method: req.method,
    headers,
    body,
    duplex: body ? "half" : undefined,
  });
}

async function handleRequest(req, res) {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || `localhost:${PORT}`}`);
    const staticAsset = await serveStaticAsset(url.pathname);

    if (staticAsset) {
      res.statusCode = staticAsset.status;
      staticAsset.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      const buffer = Buffer.from(await staticAsset.arrayBuffer());
      res.end(buffer);
      return;
    }

    const serverModule = await getServerModule();
    const request = await toWebRequest(req);
    const response = await serverModule.fetch(request, undefined, undefined);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (req.method === "HEAD" || !response.body) {
      res.end();
      return;
    }

    const nodeStream = Readable.fromWeb(response.body);
    nodeStream.on("error", (error) => {
      log("error", "response stream error", error);
      if (!res.headersSent) {
        res.statusCode = 500;
      }
      res.end();
    });
    nodeStream.pipe(res);
  } catch (error) {
    log("error", "request failed", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "text/plain; charset=utf-8");
    }
    res.end("Internal Server Error");
  }
}

async function main() {
  if (!existsSync(CLIENT_DIR)) {
    throw new Error(`Missing client build output at ${CLIENT_DIR}. Run npm run build first.`);
  }

  await getServerModule();

  const server = createServer((req, res) => {
    void handleRequest(req, res);
  });

  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 70_000;

  server.listen(PORT, HOST, () => {
    log("log", `Server listening on http://${HOST}:${PORT}`);
    log("log", `Serving client assets from ${CLIENT_DIR}`);
  });

  const shutdown = (signal) => {
    log("log", `Received ${signal}, shutting down`);
    server.close((error) => {
      if (error) {
        log("error", "shutdown error", error);
        process.exit(1);
      }
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((error) => {
  log("error", "startup failed", error);
  process.exit(1);
});
