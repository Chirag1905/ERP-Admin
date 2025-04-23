// lib/auth.js (testing version)
export const STATIC_TEST_TOKEN = '';

/**
 * Mock token verification for testing
 */
export async function verifyToken(token) {
  // For testing, only this token is valid
  return token === STATIC_TEST_TOKEN 
    ? { userId: 'test-user-1', email: 'test@example.com' } 
    : false;
}

/**
 * Mock session validation for testing
 */
export async function validateSession(token) {
  return token === STATIC_TEST_TOKEN;
}