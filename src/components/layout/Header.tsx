import { Train, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-md">
            <Train className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Smart Seat</span>
            <span className="text-xs text-muted-foreground">Indian Railways</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link 
                to="/exchange" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Request Exchange
              </Link>
              <Link 
                to="/matches" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Matches
              </Link>
              <div className="flex items-center gap-2 border-l border-border pl-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Link to="/register">
                <Button variant="hero" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
