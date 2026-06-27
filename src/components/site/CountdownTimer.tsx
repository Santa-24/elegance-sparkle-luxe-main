import { useEffect, useState } from "react";

type CountdownTimerProps = {
  validity?: string;
  targetDate?: string | Date;
  days?: number;
  dark?: boolean;
};

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

function getTargetTime(props: CountdownTimerProps): number {
  if (props.targetDate) {
    return new Date(props.targetDate).getTime();
  }
  if (props.validity) {
    const dates = props.validity.match(/\d{4}-\d{2}-\d{2}/g);
    const endDate = dates?.[dates.length - 1];
    if (endDate) {
      const target = new Date(`${endDate}T23:59:59`);
      if (!Number.isNaN(target.getTime())) {
        return target.getTime();
      }
    }
  }
  if (props.days !== undefined) {
    return Date.now() + props.days * 86400000;
  }
  return Date.now() + 15 * 86400000;
}

export function CountdownTimer({
  validity,
  targetDate,
  days,
  dark = false,
}: CountdownTimerProps) {
  const [target, setTarget] = useState(() => getTargetTime({ validity, targetDate, days }));

  useEffect(() => {
    setTarget(getTargetTime({ validity, targetDate, days }));
  }, [validity, targetDate, days]);

  const [t, setT] = useState(() => diff(target));
  const [isExpired, setIsExpired] = useState(() => Date.now() > target);

  useEffect(() => {
    setIsExpired(Date.now() > target);
    setT(diff(target));

    const id = setInterval(() => {
      const now = Date.now();
      if (now > target) {
        setIsExpired(true);
        clearInterval(id);
      } else {
        setT(diff(target));
      }
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  if (isExpired) {
    return (
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-semibold tracking-wider uppercase">
          Offer Expired
        </span>
      </div>
    );
  }

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
