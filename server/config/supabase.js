
const { createClient } = require("@supabase/supabase-js");

const rawUrl = process.env.SUPABASE_URL?.trim();
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

if (!rawUrl || !secretKey) {
  throw new Error("Supabase environment variables are missing.");
}

let supabaseUrl;

try {
  const parsedUrl = new URL(rawUrl);

  if (
    parsedUrl.protocol !== "https:" ||
    !parsedUrl.hostname.endsWith(".supabase.co") ||
    parsedUrl.pathname !== "/" ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error("Invalid Supabase Project URL.");
  }

  supabaseUrl = parsedUrl.origin;
} catch (error) {
  throw new Error(`Invalid SUPABASE_URL: ${error.message}`);
}

const supabase = createClient(supabaseUrl, secretKey);

module.exports = supabase;
