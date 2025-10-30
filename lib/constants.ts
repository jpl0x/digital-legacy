/**
 * Application-wide constants and configuration values
 * Centralizes magic numbers and strings for easier maintenance
 */

/**
 * Placeholder user ID used before authentication is implemented
 * Replace with real user IDs after auth integration
 */
export const PLACEHOLDER_USER_ID = '00000000-0000-0000-0000-000000000000'

/**
 * Default entry type for journal entries
 */
export const DEFAULT_ENTRY_TYPE = 'freeform'

/**
 * Date format configuration for display
 */
export const DATE_FORMAT = {
  locale: 'en-GB',
  options: {
    day: 'numeric' as const,
    month: 'long' as const,
    year: 'numeric' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const,
  }
}

/**
 * Application metadata
 */
export const APP_META = {
  name: 'Digital Legacy',
  tagline: 'For My Son',
  description: 'Preserve yourself for the people you love',
  copyright: `Digital Legacy © ${new Date().getFullYear()}`,
  footer: 'Building something meaningful, one entry at a time.',
}

/**
 * UI configuration
 */
export const UI_CONFIG = {
  maxEntryPreviewLength: 200,
  defaultTextareaRows: 6,
  autoSaveDelay: 3000, // milliseconds
}

/**
 * Validation rules
 */
export const VALIDATION = {
  minEntryLength: 1,
  maxEntryLength: 10000,
  minPasswordLength: 8, // for future auth
}