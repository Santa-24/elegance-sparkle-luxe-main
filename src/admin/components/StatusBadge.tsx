interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = status.toLowerCase();
  
  let bgClass = "bg-[#10b981]/15 text-[#10b981]"; // active/approved/visible/completed
  
  if (s === "pending" || s === "scheduled" || s === "rescheduled") {
    bgClass = "bg-[#f59e0b]/15 text-[#f59e0b]";
  } else if (
    s === "rejected" || 
    s === "draft" || 
    s === "expired" || 
    s === "paused" || 
    s === "cancelled" || 
    s === "archived"
  ) {
    bgClass = "bg-[#f43f5e]/15 text-[#f43f5e]";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${bgClass}`}>
      {status}
    </span>
  );
}
