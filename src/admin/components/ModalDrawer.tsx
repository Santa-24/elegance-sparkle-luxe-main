import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalDrawerProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onSave: () => void;
  onReset?: () => void;
  hasUnsavedChanges?: boolean;
  children: ReactNode;
}

export function ModalDrawer({
  isOpen,
  title,
  description,
  onClose,
  onSave,
  onReset,
  hasUnsavedChanges,
  children,
}: ModalDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      {/* Backdrop Close Click Area */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Drawer */}
      <div className="modal-drawer relative z-[51] flex flex-col h-full w-full max-w-[480px] bg-[#161009] border-l border-[#2a2015] shadow-luxury">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#2a2015]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]">
              Modal Editor
            </span>
            <h3 className="mt-1 font-display text-xl text-[#f5e6d0]">{title}</h3>
            {description && <p className="mt-1 text-xs text-[#c5b399]/85">{description}</p>}
            {hasUnsavedChanges && (
              <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[10px] font-bold text-[#f59e0b]">
                Unsaved changes
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full border border-[#2a2015] text-[#c5b399] hover:bg-[#1e1408] transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">{children}</div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 left-0 right-0 p-6 bg-[#161009] border-t border-[#2a2015] flex items-center justify-between gap-4">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2.5 rounded-full border border-[#2a2015] bg-transparent text-sm font-semibold text-[#c5b399] hover:bg-[#1e1408] cursor-pointer transition"
            >
              Reset
            </button>
          )}
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#c5b399] hover:text-[#f5e6d0] cursor-pointer transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-6 py-2.5 rounded-full bg-[#c9a96e] text-[#0d0a07] text-sm font-semibold hover:bg-[#c9a96e]/95 cursor-pointer shadow-gold transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
