// This file is automatically generated. Do not edit it directly.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://vjecbfcofvwdwzzypoji.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZWNiZmNvZnZ3ZHd6enlwb2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTAzODYsImV4cCI6MjA1OTE4NjM4Nn0.aI7vnYJVkLymr80HDKi6l8t5scaFD6IrRb3M0o3p7ww";

export const supabase = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
