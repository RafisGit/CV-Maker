export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("your-project-id") || url.includes("placeholder-url")) return false;
  if (key.includes("your-anon-key") || key.includes("placeholder-key")) return false;
  return true;
}
