import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-slide-up mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Seat Exchange
          </div>
          
          {/* Main heading */}
          <h1 className="animate-slide-up delay-100 mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Smart Seat Exchange for{" "}
            <span className="text-gradient">Indian Railways</span>
          </h1>
          
          {/* Description */}
          <p className="animate-slide-up delay-200 mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Request seat exchanges securely using AI predictions. Our intelligent system analyzes 
            multiple factors to predict the likelihood of your exchange request being accepted.
          </p>
          
          {/* CTA Button */}
          <div className="animate-slide-up delay-300">
            <Button asChild variant="hero" size="lg">
              <Link to="/exchange" className="gap-2">
                Request Seat Exchange
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Features */}
          <div className="animate-slide-up delay-400 mt-16 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Instant Predictions</h3>
              <p className="text-sm text-muted-foreground">
                Get acceptance probability in seconds
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Smart Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI considers multiple exchange factors
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">No Login Required</h3>
              <p className="text-sm text-muted-foreground">
                Try instantly in demo mode
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
