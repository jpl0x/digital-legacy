/**
 * Validates that all required environment variables are present
 * Call this early in the application lifecycle to fail fast
 * 
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnv() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ]

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  )

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file.'
    )
  }
}

/**
 * Gets an environment variable with a helpful error if missing
 * 
 * @param key - The environment variable key
 * @returns The environment variable value
 * @throws {Error} If the environment variable is not set
 * 
 * @example
 * const apiKey = getEnvVar('NEXT_PUBLIC_API_KEY')
 */
export function getEnvVar(key: string): string {
  const value = process.env[key]
  
  if (!value) {
    throw new Error(
      `Environment variable ${key} is not set. ` +
      'Please add it to your .env.local file.'
    )
  }
  
  return value
}