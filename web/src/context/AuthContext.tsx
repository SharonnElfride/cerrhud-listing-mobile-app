import { supabase } from "@/lib/supabase/client";
import type { User } from "@/models/User";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin" | "super_admin";
  permissions: string[];
}

interface AuthContextType {
  //   user: UserData | null;
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //   const [user, setUser] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        await loadUserData(data.session.user.id, data.session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    // listen to login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    initSession();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (userId: string, user?: SupabaseUser) => {
    console.log("Session user");
    console.log(user);

    const { data, error } = await supabase
      .from("users")
      //   .select("id, email, username, role, permissions")
      .select("*")
      .eq("id", userId);
    //   .single();

    console.log("data");
    console.log(data);
    console.log("error");
    console.log(error);

    if (!error && data) {
      setUser(data[0]);
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
