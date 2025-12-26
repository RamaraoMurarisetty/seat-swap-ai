import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Train } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExchangeForm from "@/components/exchange/ExchangeForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Exchange = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Request Seat Exchange | Smart Seat Exchange for Indian Railways</title>
        <meta 
          name="description" 
          content="Fill in your travel details to get an AI-powered prediction for your seat exchange request acceptance probability."
        />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Banner */}
          <section className="relative overflow-hidden gradient-hero py-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-accent blur-3xl" />
            </div>
            
            <div className="container relative">
              <Button asChild variant="ghost" className="mb-6 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/dashboard" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/20 shadow-lg">
                  <Train className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary-foreground">
                    Seat Exchange Request
                  </h1>
                  <p className="text-primary-foreground/80">
                    Find passengers likely to accept your exchange
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="container py-10">
            <div className="mx-auto max-w-2xl">
              <ExchangeForm />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Exchange;
