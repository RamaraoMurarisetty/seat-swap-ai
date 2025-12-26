import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Users, ArrowLeft, RefreshCw, TrendingUp, MapPin, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://127.0.0.1:5000";

interface Match {
  id: number;
  probability: number;
  coachDistance: number;
  groupSize: number;
  seatType?: string;
}

interface PredictMatchesResponse {
  total_analyzed: number;
  willing_to_exchange: number;
  matches: Array<{
    passenger_id: number;
    acceptance_probability: number;
    coach_distance: number;
    group_size: number;
    seat_type?: string;
  }>;
}

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

const getProbabilityBadge = (probability: number) => {
  if (probability >= 85) return "success";
  if (probability >= 75) return "warning";
  return "destructive";
};

const Matches = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [totalAnalyzed, setTotalAnalyzed] = useState(0);
  const [willingToExchange, setWillingToExchange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMatches = async () => {
    if (!user?.user_id) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/predict_matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch matches");
      }

      const data: PredictMatchesResponse = await response.json();
      
      setTotalAnalyzed(data.total_analyzed);
      setWillingToExchange(data.willing_to_exchange);
      
      const formattedMatches: Match[] = data.matches.map((match, index) => ({
        id: match.passenger_id || index + 1,
        probability: Math.round(match.acceptance_probability),
        coachDistance: match.coach_distance,
        groupSize: match.group_size,
        seatType: match.seat_type || "Berth",
      }));
      
      setMatches(formattedMatches);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Could not fetch matches. Please ensure the Flask API is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchMatches();
  }, [isAuthenticated, navigate, user?.user_id]);

  const handleRefresh = () => {
    fetchMatches();
  };

  return (
    <>
      <Helmet>
        <title>Exchange Matches | Smart Seat Exchange</title>
        <meta name="description" content="View passengers willing to exchange seats" />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 py-8">
          <div className="container">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="outline" size="icon">
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
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Card className="border-border/50">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Passengers Analyzed</p>
                    <p className="text-2xl font-bold text-foreground">{totalAnalyzed}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-success/20 bg-success/5">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Willing to Exchange</p>
                    <p className="text-2xl font-bold text-success">{willingToExchange} passengers</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Matches List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Analyzing passengers...</p>
                </div>
              </div>
            ) : matches.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-lg font-medium text-foreground">No matches found</p>
                  <p className="mt-2 text-muted-foreground">
                    Submit a seat exchange request first to find matches.
                  </p>
                  <Link to="/exchange" className="mt-4 inline-block">
                    <Button variant="hero">Submit Request</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Ranked Matches (Highest Probability First)
                </h2>
                
                <div className="grid gap-4">
                  {matches.map((match, index) => (
                    <Card 
                      key={match.id} 
                      className={`border-2 transition-all hover:shadow-md ${
                        index === 0 ? "border-success/30 bg-success/5" : "border-border/50"
                      }`}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
                              #{index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                Passenger #{match.id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {match.seatType}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{match.coachDistance === 0 ? "Same Coach" : `${match.coachDistance} coaches away`}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <UsersRound className="h-4 w-4" />
                              <span>Group of {match.groupSize}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-32">
                              <Progress 
                                value={match.probability} 
                                className={`h-2 ${getProbabilityBg(match.probability)}`}
                              />
                            </div>
                            <Badge 
                              variant={getProbabilityBadge(match.probability) as any}
                              className="min-w-[60px] justify-center"
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
            <div className="mt-8 flex justify-center">
              <Link to="/exchange">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4" />
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
