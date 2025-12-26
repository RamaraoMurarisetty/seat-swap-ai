import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Send, Users, Brain, LogOut, ArrowRight, Train, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowAIWorks from "@/components/dashboard/HowAIWorks";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Smart Seat Exchange</title>
        <meta name="description" content="Manage your seat exchange requests" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Welcome Section */}
          <section className="relative overflow-hidden border-b border-border/40">
            {/* Background Pattern */}
            <div className="absolute inset-0 gradient-hero opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            
            <div className="container relative py-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/30">
                    <Train className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Welcome back,</p>
                    <h1 className="mt-1 text-3xl font-bold text-primary-foreground md:text-4xl">
                      {user.name}
                    </h1>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-md bg-primary-foreground/20 px-2 py-0.5 font-mono text-sm text-primary-foreground">
                        PNR: {user.pnr}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  className="w-fit border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="py-8">
            <div className="container">
              <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5 shadow-lg">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl gradient-mixed shadow-md">
                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">AI-Powered Matching</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Submit a seat exchange request and our AI will analyze all current passengers 
                      to find who is likely to accept the exchange. The system compares your request 
                      with approximately <span className="font-semibold text-primary">100 other passengers</span> to find the best matches.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Action Cards */}
          <section className="py-8">
            <div className="container">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Submit Request Card */}
                <Card className="group relative overflow-hidden border-2 border-primary/30 bg-card shadow-lg transition-all hover:border-primary/50 hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
                  <CardHeader className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                      <Send className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="mt-4 text-xl">Submit Exchange Request</CardTitle>
                    <CardDescription className="text-base">
                      Fill in your preferences and let AI find the best matches for seat exchange
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/exchange">
                      <Button variant="hero" className="w-full text-base">
                        Submit Request
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* View Matches Card */}
                <Card className="group relative overflow-hidden border-2 border-accent/30 bg-card shadow-lg transition-all hover:border-accent/50 hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-accent/10 transition-transform group-hover:scale-150" />
                  <CardHeader className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-accent shadow-lg shadow-accent/30 transition-transform group-hover:scale-110">
                      <Users className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="mt-4 text-xl">View Exchange Matches</CardTitle>
                    <CardDescription className="text-base">
                      See passengers who are likely to accept your seat exchange request
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/matches">
                      <Button variant="accent" className="w-full text-base">
                        View Matches
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How AI Works Section */}
          <HowAIWorks />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;