import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Send, Users, Brain, LogOut, ArrowRight } from "lucide-react";
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

      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Welcome Section */}
          <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
            <div className="container">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">Welcome back,</p>
                  <h1 className="mt-1 text-3xl font-bold text-foreground md:text-4xl">
                    {user.name}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    PNR: <span className="font-mono">{user.pnr}</span>
                  </p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="w-fit">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="py-8">
            <div className="container">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI-Powered Matching</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Submit a seat exchange request and our AI will analyze all current passengers 
                      to find who is likely to accept the exchange. The system compares your request 
                      with approximately 100 other passengers to find the best matches.
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
                <Card className="group border-2 border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Send className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Submit Exchange Request</CardTitle>
                    <CardDescription>
                      Fill in your preferences and let AI find the best matches for seat exchange
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/exchange">
                      <Button variant="hero" className="w-full">
                        Submit Request
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="group border-2 border-border/50 transition-all hover:border-success/30 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success/10 transition-colors group-hover:bg-success/20">
                      <Users className="h-7 w-7 text-success" />
                    </div>
                    <CardTitle className="mt-4">View Exchange Matches</CardTitle>
                    <CardDescription>
                      See passengers who are likely to accept your seat exchange request
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/matches">
                      <Button variant="success" className="w-full">
                        View Matches
                        <ArrowRight className="h-4 w-4" />
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
