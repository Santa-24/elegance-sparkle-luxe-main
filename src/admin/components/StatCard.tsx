import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string; // Optional trend string (e.g. "+12%")
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="stat-card flex flex-col justify-between p-5 rounded-xl bg-[#161009] border-t-2 border-[#c9a96e] border-x border-b border-[#2a2015] shadow-luxury transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(201,169,110,0.15)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5b399]">
        {label}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-28px font-display text-[#f5e6d0] font-semibold leading-none">
          {value}
        </div>
        {trend && (
          <span className="flex items-center text-xs font-semibold text-[#10b981] gap-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
