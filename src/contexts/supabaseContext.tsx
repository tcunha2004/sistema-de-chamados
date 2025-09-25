import { createContext, type ReactNode } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface SupabaseContextoType {
  supabase: SupabaseClient;
}

interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseContext = createContext({} as SupabaseContextoType);

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  const supabaseUrl = "sua-url-supabase";
  const supabaseKey = "sua-api-key";
  const supabase = createClient(supabaseUrl, supabaseKey);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}
