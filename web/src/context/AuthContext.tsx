import { useProfileSubscription } from "@/hooks/useProfileSubscription";
import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/supabase";
import { PROFILES_TABLENAME } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Tables<"profiles"> | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  useProfileSubscription({
    userId: user?.id,
    onProfileUpdate: (updated) => {
      setUser((prev) => ({
        ...prev,
        ...updated,
        avatar: updated.avatar ? `${updated.avatar}?v=${Date.now()}` : null,
      }));
    },
  });

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session?.user) {
        await loadUserData(data.session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    initSession();

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from(PROFILES_TABLENAME)
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setUser({
        ...data,
        avatar: data.avatar ? `${data.avatar}?v=${Date.now()}` : null,
      });
    }
    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
