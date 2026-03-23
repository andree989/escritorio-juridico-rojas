import { createClient } from "@supabase/supabase-js";

// Variables de entorno (Vite). No las expongas en el repo.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// En desarrollo, puede que no tengamos `.env` configurado.
// En ese caso la app no se rompe y los componentes pueden seguir funcionando.
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn(
    "Supabase no configurado: crea un archivo .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para habilitar Auth + DB."
  );
}

// Fallback ligero para que el app no rompa si falta configuración.
// Solo se usa para que los componentes puedan renderizar sin lanzar errores.
const createFallback = () => {
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_event: any, _session: any) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signOut: async () => ({ error: null }),
      signInWithOtp: async () => ({ data: null, error: null }),
    },
    from: (_table: string) => ({
      insert: async () => ({ data: null, error: { message: "Supabase no está configurado." } }),
    }),
  } as unknown as ReturnType<typeof createClient>;
};

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createFallback();
