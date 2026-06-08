import { getServerConfig } from "./config/server";

type SupabaseRow = Record<string, unknown>;

function getSupabaseBaseUrl() {
  const { supabaseUrl } = getServerConfig();
  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL");
  }

  return supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function getSupabaseServiceRoleKey() {
  const { supabaseServiceRoleKey } = getServerConfig();
  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return supabaseServiceRoleKey;
}

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const headers = new Headers(init.headers);

  headers.set("apikey", serviceRoleKey);
  headers.set("authorization", `Bearer ${serviceRoleKey}`);
  headers.set("content-type", "application/json");

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/rest/v1/${path}`, {
      ...init,
      headers,
    });
  } catch (error) {
    throw new Error(
      `Supabase fetch failed for ${baseUrl}/rest/v1/${path}. Check SUPABASE_URL and network access.`,
      { cause: error },
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${errorBody}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function supabaseUploadStorageObject(
  bucket: string,
  path: string,
  body: Uint8Array,
  contentType = "application/octet-stream",
) {
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const response = await fetch(
    `${baseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")}`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        "content-type": contentType,
        "x-upsert": "true",
      },
      body: new Uint8Array(body).buffer,
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Supabase storage upload failed (${response.status}): ${errorBody}`);
  }

  return response.json();
}

export async function supabaseInsert<T extends SupabaseRow>(
  table: string,
  payload: SupabaseRow,
  select = "*",
) {
  return supabaseRequest<T[]>(`${table}?select=${encodeURIComponent(select)}`, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });
}

export async function supabaseSelect<T extends SupabaseRow>(path: string) {
  return supabaseRequest<T[]>(path, { method: "GET" });
}

export async function supabaseUpdate<T extends SupabaseRow>(
  table: string,
  matchQuery: string,
  payload: SupabaseRow,
  select = "*",
) {
  return supabaseRequest<T[]>(`${table}?${matchQuery}&select=${encodeURIComponent(select)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });
}

export async function supabaseDelete<T extends SupabaseRow>(
  table: string,
  matchQuery: string,
  select = "*",
) {
  return supabaseRequest<T[]>(`${table}?${matchQuery}&select=${encodeURIComponent(select)}`, {
    method: "DELETE",
    headers: { Prefer: "return=representation" },
  });
}
