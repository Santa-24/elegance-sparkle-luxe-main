// ============================================
// APP CONFIGURATION - Feature Flags & Toggles
// ============================================

/**
 * Feature flags and application configuration
 */
export const appConfig = {
  // Feature toggles
  features: {
    adminPanel: true,
    bookingSystem: true,
    galleryDisplay: true,
    testimonials: true,
    offers: true,
    academy: true,
    notifications: true,
    emailNotifications: true,
    whatsappIntegration: true,
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // Cache settings
  cache: {
    ttl: 3600, // 1 hour
    bookingsTTL: 300, // 5 minutes
  },

  // Form validation
  validation: {
    phoneNumberLength: 10,
    minPasswordLength: 8,
    maxTextLength: 500,
  },

  // UI settings
  ui: {
    toastDuration: 4000,
    animationDuration: 300,
    debounceDelay: 500,
  },
};

export type AppConfig = typeof appConfig;
