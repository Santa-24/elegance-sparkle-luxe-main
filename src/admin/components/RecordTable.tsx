import { useState, useMemo, useCallback } from "react";
import { Search, ChevronDown, Trash2, Check, X, Pencil } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { BulkActionBar } from "./BulkActionBar";

interface ColumnDef {
  key: string;
  header: string;
  isPrimary?: boolean;
  type?: "text" | "number" | "boolean" | "status";
}

const sectionColumns: Record<string, ColumnDef[]> = {
  Bookings: [
    { key: "name", header: "Customer", isPrimary: true },
    { key: "service", header: "Service" },
    { key: "date", header: "Date" },
    { key: "time", header: "Time" },
    { key: "phone", header: "Phone" },
    { key: "status", header: "Status", type: "status" },
  ],
  Services: [
    { key: "title", header: "Service Title", isPrimary: true },
    { key: "category", header: "Category" },
    { key: "price_label", header: "Price" },
    { key: "duration_label", header: "Duration" },
    { key: "featured", header: "Featured", type: "boolean" },
    { key: "status", header: "Status", type: "status" },
  ],
  Gallery: [
    { key: "title", header: "Title", isPrimary: true },
    { key: "category", header: "Category" },
    { key: "alt_text", header: "Alt Text" },
    { key: "sort_order", header: "Sort Order", type: "number" },
    { key: "status", header: "Status", type: "status" },
  ],
  Testimonials: [
    { key: "customer_name", header: "Customer Name", isPrimary: true },
    { key: "service_name", header: "Service" },
    { key: "rating", header: "Rating", type: "number" },
    { key: "wedding_month_year", header: "Wedding Month" },
    { key: "status", header: "Status", type: "status" },
  ],
  Offers: [
    { key: "title", header: "Offer Title", isPrimary: true },
    { key: "discount_label", header: "Discount" },
    { key: "valid_from", header: "Starts" },
    { key: "valid_until", header: "Ends" },
    { key: "status", header: "Status", type: "status" },
  ],
  "Pricing Packages": [
    { key: "name", header: "Package Name", isPrimary: true },
    { key: "price", header: "Price", type: "number" },
    { key: "popular", header: "Popular", type: "boolean" },
    { key: "sort_order", header: "Sort Order", type: "number" },
    { key: "status", header: "Status", type: "status" },
  ],
  Ads: [
    { key: "title", header: "Ad Title", isPrimary: true },
    { key: "asset_type", header: "Asset Type" },
    { key: "start_date", header: "Start Date" },
    { key: "end_date", header: "End Date" },
    { key: "status", header: "Status", type: "status" },
  ],
  Hero: [
    { key: "heading", header: "Heading", isPrimary: true },
    { key: "subtitle", header: "Subtitle" },
    { key: "primary_cta_label", header: "Primary CTA" },
    { key: "status", header: "Status", type: "status" },
  ],
  About: [
    { key: "headline", header: "Headline", isPrimary: true },
    { key: "founder_name", header: "Founder" },
    { key: "founder_title", header: "Title" },
    { key: "status", header: "Status", type: "status" },
  ],
  Contact: [
    { key: "email", header: "Email Address", isPrimary: true },
    { key: "phone", header: "Phone" },
    { key: "whatsapp", header: "WhatsApp" },
    { key: "working_hours", header: "Working Hours" },
    { key: "status", header: "Status", type: "status" },
  ],
  Social: [
    { key: "instagram", header: "Instagram URL", isPrimary: true },
    { key: "facebook", header: "Facebook URL" },
    { key: "whatsapp", header: "WhatsApp" },
    { key: "status", header: "Status", type: "status" },
  ],
  FAQ: [
    { key: "title", header: "FAQ Title", isPrimary: true },
    { key: "slug", header: "Section Slug" },
    { key: "sort_order", header: "Sort Order", type: "number" },
    { key: "status", header: "Status", type: "status" },
  ],
  "Service Areas": [
    { key: "name", header: "Area Name", isPrimary: true },
    { key: "sort_order", header: "Sort Order", type: "number" },
    { key: "status", header: "Status", type: "status" },
  ],
  SEO: [
    { key: "meta_title", header: "Meta Title", isPrimary: true },
    { key: "canonical_url", header: "Canonical URL" },
    { key: "status", header: "Status", type: "status" },
  ],
  Customers: [
    { key: "customer_name", header: "Customer Name", isPrimary: true },
    { key: "customer_phone", header: "Phone" },
    { key: "customer_email", header: "Email" },
    { key: "total_bookings", header: "Bookings", type: "number" },
    { key: "total_spent", header: "Spent (Rs)", type: "number" },
    { key: "status", header: "Pref. Contact", type: "status" },
  ],
};

interface RecordTableProps {
  section: string;
  items: Array<Record<string, any>>;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onBulkAction: (
    action: "approve" | "reject" | "delete",
    ids: Array<string | number>,
  ) => Promise<void>;
  config: { title: string; canCreate: boolean };
}

export function RecordTable({
  section,
  items,
  onEdit,
  onDelete,
  onBulkAction,
  config,
}: RecordTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

  const columns = sectionColumns[section] || [];
  const primaryCol = columns.find((c) => c.isPrimary) || columns[0] || { key: "id", header: "ID" };

  const getRowStatus = useCallback((item: any) => {
    if (section === "Customers") return item.preferred_contact_method || "N/A";
    if (item.status !== undefined) return item.status;
    if (item.is_active !== undefined) return item.is_active ? "Active" : "Paused";
    return "Active";
  }, [section]);

  const getRowValue = (item: any, key: string) => {
    if (key === "status") {
      return getRowStatus(item);
    }
    const val = item[key];
    if (val === undefined || val === null) return "";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return String(val);
  };

  // Client-side filtering & search
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Search Query Match
      const matchesSearch = Object.entries(item).some(([key, val]) => {
        if (key === "id" || typeof val === "boolean") return false;
        return String(val).toLowerCase().includes(searchQuery.toLowerCase());
      });

      // 2. Status Match
      const status = getRowStatus(item).toLowerCase();
      let matchesFilter = true;
      if (statusFilter === "Pending") {
        matchesFilter = status === "pending" || status === "scheduled" || status === "rescheduled";
      } else if (statusFilter === "Active") {
        matchesFilter =
          status === "active" ||
          status === "approved" ||
          status === "visible" ||
          status === "completed";
      } else if (statusFilter === "Rejected") {
        matchesFilter =
          status === "rejected" ||
          status === "draft" ||
          status === "expired" ||
          status === "paused" ||
          status === "cancelled" ||
          status === "archived";
      }

      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, statusFilter, section, getRowStatus]);

  // Client-side sorting
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    if (sortBy === "Oldest") {
      list.sort((a, b) => {
        const idA = Number(a.id);
        const idB = Number(b.id);
        if (!isNaN(idA) && !isNaN(idB)) return idA - idB;
        return String(a.id).localeCompare(String(b.id));
      });
    } else if (sortBy === "A-Z") {
      list.sort((a, b) => {
        const titleA = String(a[primaryCol.key] || "").toLowerCase();
        const titleB = String(b[primaryCol.key] || "").toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else {
      // Newest
      list.sort((a, b) => {
        const idA = Number(a.id);
        const idB = Number(b.id);
        if (!isNaN(idA) && !isNaN(idB)) return idB - idA;
        return String(b.id).localeCompare(String(a.id));
      });
    }
    return list;
  }, [filteredItems, sortBy, primaryCol.key]);

  // Checkbox management
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(sortedItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const canApproveReject =
    section === "Bookings" ||
    section === "Testimonials" ||
    section === "Offers" ||
    section === "Ads";

  const handleApprove = async () => {
    await onBulkAction("approve", selectedIds);
    setSelectedIds([]);
  };

  const handleReject = async () => {
    await onBulkAction("reject", selectedIds);
    setSelectedIds([]);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} selected items? This cannot be undone.`,
    );
    if (confirm) {
      await onBulkAction("delete", selectedIds);
      setSelectedIds([]);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#0d0a07]">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between border-b border-[#2a2015] mb-4">
        {/* Search */}
        <div className="relative w-full max-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c5b399]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${config.title.toLowerCase()}...`}
            className="search-input w-full pl-10 pr-4 py-2 bg-[#0d0a07] border border-[#2a2015] text-[#f5e6d0] text-sm rounded-lg outline-none placeholder-[#c5b399]/50 transition-colors focus:border-[#c9a96e]"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Status filter chips */}
          <div className="flex items-center gap-1.5 bg-[#161009] p-1 rounded-full border border-[#2a2015]">
            {["All", "Pending", "Active", "Rejected"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer transition ${
                  statusFilter === filter
                    ? "bg-[#c9a96e] text-[#0d0a07]"
                    : "text-[#c5b399] hover:text-[#f5e6d0]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#161009] text-xs font-semibold text-[#c5b399] hover:text-[#f5e6d0] pl-3 pr-8 py-2 rounded-full border border-[#2a2015] outline-none cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A-Z">A–Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#c5b399] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Record Table Container */}
      <div className="flex-1 overflow-x-auto min-h-[300px]">
        {sortedItems.length > 0 ? (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#1a1208] border-b border-[#c9a96e]">
                <th className="p-4 w-[50px]">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === sortedItems.length && sortedItems.length > 0}
                    onChange={handleSelectAll}
                    className="accent-[#c9a96e] cursor-pointer"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="p-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5b399]"
                  >
                    {col.header}
                  </th>
                ))}
                <th className="p-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5b399] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item, idx) => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <tr
                    key={String(item.id)}
                    className={`border-b border-[#2a2015] hover:bg-[#1e1408] transition ${
                      isChecked
                        ? "bg-[#221a0a] border-l-2 border-[#c9a96e]"
                        : idx % 2 === 0
                          ? "bg-[#0d0a07]"
                          : "bg-[#101008]"
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                        className="accent-[#c9a96e] cursor-pointer"
                      />
                    </td>
                    {columns.map((col) => {
                      const val = getRowValue(item, col.key);
                      if (col.type === "status") {
                        return (
                          <td key={col.key} className="p-4">
                            <StatusBadge status={val} />
                          </td>
                        );
                      }
                      return (
                        <td
                          key={col.key}
                          className={`p-4 text-sm ${
                            col.isPrimary
                              ? "text-[#f5e6d0] font-medium"
                              : "text-[#c5b399] font-normal"
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#c9a96e]/15 text-[#c9a96e] text-xs font-semibold hover:bg-[#c9a96e]/25 cursor-pointer transition"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const confirm = window.confirm(
                            "Are you sure you want to delete this record?",
                          );
                          if (confirm) onDelete(item.id);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f43f5e]/10 text-[#f43f5e] text-xs font-semibold hover:bg-[#f43f5e]/20 cursor-pointer transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-10 w-10 text-[#c5b399]/40 mb-4" />
            <h3 className="font-display text-lg text-[#f5e6d0] mb-2">
              No {config.title.toLowerCase()} found
            </h3>
            <p className="text-sm text-[#c5b399]/60 mb-6">
              Create the first record or adjust your filters.
            </p>
            {config.canCreate && (
              <button
                type="button"
                onClick={() => onEdit("")}
                className="px-6 py-2.5 rounded-full bg-[#c9a96e] text-[#0d0a07] text-sm font-semibold hover:bg-[#c9a96e]/90 cursor-pointer transition"
              >
                Create Record
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bulk actions */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        canApproveReject={canApproveReject}
      />
    </div>
  );
}
