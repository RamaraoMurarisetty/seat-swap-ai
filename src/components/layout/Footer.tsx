import { Train, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Train className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Smart Seat Exchange
            </span>
          </div>
          
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-destructive" /> for Indian Railways passengers
          </p>
          
          <p className="text-xs text-muted-foreground">
            © 2024 Demo Mode • No login required
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
