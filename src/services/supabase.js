import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Wrap Supabase queries with a 10-second timeout to prevent hanging
 * Surfaces all errors to the UI - never fails silently
 */
export async function withTimeout(promise, timeoutMs = 10000, operation = 'Database operation') {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`${operation} timed out after ${timeoutMs}ms. Please check your connection.`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    return result;
  } catch (error) {
    // Surface all errors - never fail silently
    console.error(`[Supabase Error] ${operation}:`, error);
    throw error;
  }
}

/**
 * Safe query wrapper that handles Supabase response format
 * Returns { data, error } and surfaces any errors
 */
export async function safeQuery(queryPromise, operation = 'Query') {
  try {
    const result = await withTimeout(queryPromise, 10000, operation);

    if (result.error) {
      console.error(`[Supabase Error] ${operation}:`, result.error);
      return { data: null, error: result.error };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error(`[Supabase Error] ${operation}:`, error);
    return { data: null, error: error };
  }
}

/**
 * Test Supabase connection
 */
export async function testConnection() {
  try {
    const { data, error } = await safeQuery(
      supabase.from('users').select('count').limit(1),
      'Connection test'
    );

    if (error) throw error;

    return { success: true, message: 'Connected to Supabase successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to connect to Supabase',
      error
    };
  }
}
