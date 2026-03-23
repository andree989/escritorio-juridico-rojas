import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

/**
 * Hook para manejar el estado de autenticación con Supabase.
 *
 * - Carga la sesión actual al montar.
 * - Escucha los cambios de sesión (login/logout) para mantener el estado sincronizado.
 * - Provee funciones para iniciar sesión con magic link y cerrar sesión.
 */
export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const sendMagicLink = useCallback(async (email: string) => {
    await supabase.auth.signInWithOtp({ email });
  }, []);

  return { user, isLoading, signOut, sendMagicLink };
};
