import { createClient } from "@supabase/supabase-js";


const supabaseURL = "https://vzrmvcpmnmrlbgafgcjg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cm12Y3Btbm1ybGJnYWZnY2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwOTQwNjQsImV4cCI6MjAwNzY3MDA2NH0.3pSL8gzD7BrCSAFuGlSSuRWCnKMiKLmx48GSWCORfO8";

export const supabase = createClient(
    supabaseURL, // URL
    supabaseKey, // anonキー
//    {}
);