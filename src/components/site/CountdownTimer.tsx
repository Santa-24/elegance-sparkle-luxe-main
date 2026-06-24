import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function CountdownTimer({ days = 15, dark = false }: { days?: number; dark?: boolean }) {
  const [target] = useState(() => Date.now() + days * 86400000);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Min", value: t.m },
    { label: "Sec", value: t.s },
  ];

  return (
    <div className="flex gap-2 md:gap-4 justify-center">
      {items.map((i) => (
        <div key={i.label} className="text-center">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-display text-xl sm:text-2xl md:text-3xl font-light ${
            dark
              ? "bg-[#0d0a07] text-[#c9a96e]"
              : "border border-[#c9a96e]/20 bg-[#161009] text-[#c9a96e]"
          }`}>
            {String(i.value).padStart(2, "0")}
          </div>
          <div className={`text-[9px] tracking-widest uppercase mt-2 ${
            dark ? "text-[#0d0a07]/80" : "text-[#f9f5ef]/70"
          }`}>
            {i.label}
          </div>
        </div>
      ))}
    </div>
  );
}
