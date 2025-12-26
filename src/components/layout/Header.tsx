import { Train, LogOut, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 shadow-md backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary shadow-lg">
            <Train className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Smart Seat</span>
            <span className="text-xs font-medium text-accent">Indian Railways</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Link 
                to="/exchange" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Request Exchange
              </Link>
              <Link 
                to="/matches" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Matches
              </Link>
              <div className="flex items-center gap-3 border-l-2 border-border pl-6">
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{user?.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-accent hover:bg-accent/10 hover:text-accent">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg md:hidden animate-fade-in">
            <nav className="container py-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/exchange" 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Request Exchange
                  </Link>
                  <Link 
                    to="/matches" 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Matches
                  </Link>
                  <div className="border-t border-border pt-3 mt-2 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{user?.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-accent">
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="hero" className="w-full">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;