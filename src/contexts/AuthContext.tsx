import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  pnr: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, pnr: string) => boolean;
  register: (name: string, pnr: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "seat_exchange_users";
const CURRENT_USER_KEY = "seat_exchange_current_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const register = (name: string, pnr: string): boolean => {
    const users = getUsers();
    const exists = users.some((u) => u.pnr === pnr);
    
    if (exists) {
      return false; // User already exists
    }

    const newUser = { name: name.trim(), pnr };
    users.push(newUser);
    saveUsers(users);
    return true;
  };

  const login = (name: string, pnr: string): boolean => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => u.pnr === pnr && u.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
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
