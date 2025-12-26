import { Train } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-md">
            <Train className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Smart Seat</span>
            <span className="text-xs text-muted-foreground">Indian Railways</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link 
            to="/exchange" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Request Exchange
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
