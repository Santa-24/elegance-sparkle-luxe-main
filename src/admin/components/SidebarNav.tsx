import type { ComponentType } from "react";

interface SidebarNavItemProps {
  label: string;
  icon: ComponentType<{ className?: string }>;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarNavItem({
  label,
  icon: Icon,
  count,
  isActive,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sidebar-nav-item flex w-full h-[40px] items-center justify-between px-4 py-2 text-[13px] font-medium transition-none cursor-pointer ${
        isActive
          ? "border-l-3 border-[#c9a96e] bg-[#1e1408] text-[#f5e6d0]"
          : "border-l-3 border-transparent text-[#c5b399] hover:bg-[#161009] hover:text-[#f5e6d0]"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-[18px] w-[18px] text-[#c9a96e]" />
        <span>{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className="rounded-full bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold text-[#0d0a07]">
          {count}
        </span>
      )}
    </button>
  );
}

interface SidebarNavProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
  counts: Record<string, number>;
  sectionsConfig: Array<{
    group: string;
    items: Array<{
      key: string;
      label: string;
      icon: ComponentType<{ className?: string }>;
    }>;
  }>;
}

export function SidebarNav({
  activeSection,
  onSectionChange,
  counts,
  sectionsConfig,
}: SidebarNavProps) {
  return (
    <div className="flex flex-col gap-6 py-4">
      {sectionsConfig.map((group) => (
        <div key={group.group} className="flex flex-col">
          <div className="px-4 mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5b399]/60">
            {group.group}
          </div>
          <div className="flex flex-col">
            {group.items.map((item) => (
              <SidebarNavItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                count={counts[item.key]}
                isActive={activeSection === item.key}
                onClick={() => onSectionChange(item.key)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
