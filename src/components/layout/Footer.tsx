import { Train, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 bg-card">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-mixed" />
      
      <div className="container py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-md">
              <Train className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-foreground">Smart Seat Exchange</span>
              <span className="text-xs text-accent font-medium">Indian Railways</span>
            </div>
          </div>
          
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            AI-powered seat exchange assistance for Indian Railways passengers. 
            Find compatible passengers willing to exchange seats using machine learning.
          </p>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-accent fill-accent animate-pulse" />
            <span>for Indian Railways</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Demo Project</span>
            <span>•</span>
            <span>Academic Purpose Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;