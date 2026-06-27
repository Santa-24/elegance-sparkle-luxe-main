import { Check, X, Trash2 } from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete: () => void;
  canApproveReject?: boolean;
}

export function BulkActionBar({
  selectedCount,
  onApprove,
  onReject,
  onDelete,
  canApproveReject = false,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#1e1408] border-t border-[#c9a96e] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-transform duration-200 translate-y-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[#f5e6d0]">
          {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
        </span>
      </div>
      <div className="flex items-center gap-3">
        {canApproveReject && onApprove && (
          <button
            type="button"
            onClick={onApprove}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-semibold cursor-pointer hover:bg-[#10b981]/25 transition"
          >
            <Check className="h-3.5 w-3.5" />
            Approve
          </button>
        )}
        {canApproveReject && onReject && (
          <button
            type="button"
            onClick={onReject}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f43f5e]/15 text-[#f43f5e] text-xs font-semibold cursor-pointer hover:bg-[#f43f5e]/25 transition"
          >
            <X className="h-3.5 w-3.5" />
            Reject
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f43f5e] text-[#0d0a07] text-xs font-semibold cursor-pointer hover:bg-[#f43f5e]/85 transition"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
