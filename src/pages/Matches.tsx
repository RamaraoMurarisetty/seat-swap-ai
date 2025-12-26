import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Users, ArrowLeft, RefreshCw, TrendingUp, MapPin, UsersRound, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

interface Match {
  id: number;
  probability: number;
  coachDistance: number;
  groupSize: number;
  seatType: string;
}

// Generate mock matches for demo
const generateMockMatches = (): Match[] => {
  const seatTypes = ["Lower Berth", "Middle Berth", "Upper Berth", "Side Lower", "Side Upper"];
  const matches: Match[] = [];
  
  for (let i = 0; i < 14; i++) {
    matches.push({
      id: i + 1,
      probability: Math.round(70 + Math.random() * 25),
      coachDistance: Math.floor(Math.random() * 4),
      groupSize: Math.floor(Math.random() * 4) + 1,
      seatType: seatTypes[Math.floor(Math.random() * seatTypes.length)],
    });
  }
  
  return matches.sort((a, b) => b.probability - a.probability);
};

const getProbabilityColor = (probability: number) => {
  if (probability >= 85) return "text-success";
  if (probability >= 75) return "text-warning";
  return "text-accent";
};

const getProbabilityBg = (probability: number) => {
  if (probability >= 85) return "[&>div]:bg-success";
  if (probability >= 75) return "[&>div]:bg-warning";
  return "[&>div]:bg-accent";
};

const getProbabilityBadge = (probability: number): "success" | "warning" | "destructive" => {
  if (probability >= 85) return "success";
  if (probability >= 75) return "warning";
  return "destructive";
};

const Matches = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Simulate API call
    const timer = setTimeout(() => {
      setMatches(generateMockMatches());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMatches(generateMockMatches());
      setIsLoading(false);
    }, 1000);
  };

  const totalAnalyzed = 100;
  const willingToExchange = matches.length;

  return (
    <>
      <Helmet>
        <title>Exchange Matches | Smart Seat Exchange</title>
        <meta name="description" content="View passengers willing to exchange seats" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1 py-8">
          <div className="container">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    Exchange Matches
                  </h1>
                  <p className="text-muted-foreground">
                    Passengers likely to accept your exchange
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading} className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary shadow-lg">
                    <Users className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Passengers Analyzed</p>
                    <p className="text-3xl font-bold text-primary">{totalAnalyzed}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success shadow-lg shadow-success/30">
                    <TrendingUp className="h-7 w-7 text-success-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Willing to Exchange</p>
                    <p className="text-3xl font-bold text-success">{willingToExchange} passengers</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Matches List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="relative mx-auto h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  </div>
                  <p className="mt-6 text-lg font-medium text-muted-foreground">Analyzing passengers...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Ranked Matches (Highest Probability First)
                  </h2>
                </div>
                
                <div className="grid gap-4">
                  {matches.map((match, index) => (
                    <Card 
                      key={match.id} 
                      className={`border-2 transition-all hover:shadow-lg ${
                        index === 0 
                          ? "border-success/40 bg-gradient-to-r from-success/10 via-success/5 to-transparent shadow-lg" 
                          : index < 3 
                            ? "border-primary/30 bg-gradient-to-r from-primary/5 to-transparent" 
                            : "border-border/50 hover:border-primary/30"
                      }`}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${
                              index === 0 
                                ? "gradient-primary text-primary-foreground shadow-lg" 
                                : index < 3 
                                  ? "bg-primary/10 text-primary" 
                                  : "bg-muted text-muted-foreground"
                            }`}>
                              #{index + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">
                                Passenger #{match.id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {match.seatType}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{match.coachDistance === 0 ? "Same Coach" : `${match.coachDistance} coaches`}</span>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
                              <UsersRound className="h-4 w-4 text-primary" />
                              <span>Group of {match.groupSize}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-32">
                              <Progress 
                                value={match.probability} 
                                className={`h-2.5 bg-muted/50 ${getProbabilityBg(match.probability)}`}
                              />
                            </div>
                            <Badge 
                              variant={getProbabilityBadge(match.probability)}
                              className="min-w-[65px] justify-center text-sm font-bold"
                            >
                              {match.probability}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-10 flex justify-center">
              <Link to="/exchange">
                <Button variant="outline" size="lg" className="border-2 border-primary/30 hover:bg-primary/10 hover:text-primary">
                  <ArrowLeft className="h-5 w-5" />
                  Submit New Request
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Matches;