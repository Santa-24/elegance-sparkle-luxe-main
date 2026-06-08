// ============================================
// TOAST NOTIFICATIONS - UI Feedback
// ============================================

import { toast } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

/**
 * Show a success toast notification
 */
export function showSuccessToast(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 4000,
  });
}

/**
 * Show an error toast notification
 */
export function showErrorToast(message: string, description?: string) {
  toast.error(message, {
    description,
    duration: 5000,
  });
}

/**
 * Show an info toast notification
 */
export function showInfoToast(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: 3000,
  });
}

/**
 * Show a loading toast notification
 */
export function showLoadingToast(message: string) {
  return toast.loading(message);
}

/**
 * Update a toast notification
 */
export function updateToast(
  id: string | number,
  options: { message?: string; description?: string },
) {
  toast(options.message || "Done", {
    id,
    description: options.description,
    duration: 3000,
  });
}

/**
 * Common toast messages
 */
export const toastMessages = {
  // Success messages
  SAVE_SUCCESS: { message: "Saved successfully", description: "Your changes have been saved." },
  CREATE_SUCCESS: { message: "Created successfully", description: "New record has been created." },
  DELETE_SUCCESS: { message: "Deleted successfully", description: "Record has been removed." },
  UPDATE_SUCCESS: { message: "Updated successfully", description: "Changes have been applied." },

  // Error messages
  SAVE_ERROR: { message: "Save failed", description: "Please check the form and try again." },
  CREATE_ERROR: { message: "Creation failed", description: "Something went wrong." },
  DELETE_ERROR: { message: "Delete failed", description: "Unable to remove the record." },
  UPDATE_ERROR: { message: "Update failed", description: "Could not apply changes." },
  NETWORK_ERROR: { message: "Network error", description: "Please check your connection." },
  VALIDATION_ERROR: { message: "Validation failed", description: "Please check the form fields." },

  // Info messages
  LOADING: "Loading data...",
  SAVING: "Saving changes...",
  DELETING: "Deleting record...",
  NO_CHANGES: { message: "No changes", description: "Nothing to save." },
};
