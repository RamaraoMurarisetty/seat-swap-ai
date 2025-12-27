import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_BASE_URL = "http://127.0.0.1:5000";

interface User {
  name: string;
  pnr: string;
  user_id: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, pnr: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, pnr: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  submitRequest: (data: {
    gender_match: number;
    seat_upgrade: number;
    coach_distance: number;
    group_size: number;
    travel_hours: number;
  }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "seat_exchange_current_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (name: string, pnr: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pnr }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.error || "Registration failed" };
      }
    } catch (error) {
      return { success: false, error: "Could not connect to server. Please ensure the Flask API is running." };
    }
  };

  const login = async (name: string, pnr: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pnr }),
      });

      const data = await response.json();

      if (response.ok) {
        const loggedInUser = { name, pnr, user_id: data.user_id };
        setUser(loggedInUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Could not connect to server. Please ensure the Flask API is running." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const submitRequest = async (data: {
    gender_match: number;
    seat_upgrade: number;
    coach_distance: number;
    group_size: number;
    travel_hours: number;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "Not logged in" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/submit_request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, ...data }),
      });

      const responseData = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: responseData.error || "Failed to submit request" };
      }
    } catch (error) {
      return { success: false, error: "Could not connect to server." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        submitRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
