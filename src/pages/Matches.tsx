import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  seatType: string;
}

interface ExchangePayload {
  gender_match: number;
  seat_upgrade: number;
  coach_distance: number;
  requester_group_size: number;
  travel_duration: number;
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAnalyzed, setTotalAnalyzed] = useState(0);
  const [exchangePayload, setExchangePayload] = useState<ExchangePayload | null>(null);

  const fetchMatches = async (payload: ExchangePayload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/predict_matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }

      const data = await response.json();
      
      // Transform backend response to match our interface
      const transformedMatches: Match[] = (data.matches || []).map((match: any, index: number) => ({
        id: match.id || index + 1,
        probability: Math.round(match.acceptance_probability || match.probability || 0),
        coachDistance: match.coach_distance || match.coachDistance || 0,
        groupSize: match.group_size || match.groupSize || 1,
        seatType: match.seat_type || match.seatType || "Berth",
      }));

      setMatches(transformedMatches.sort((a, b) => b.probability - a.probability));
      setTotalAnalyzed(data.total_analyzed || data.totalAnalyzed || 100);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the prediction server. Please ensure the Flask API is running.",
        variant: "destructive",
      });
      setMatches([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Get payload from navigation state
    const payload = location.state?.exchangePayload as ExchangePayload | undefined;
    if (payload) {
      setExchangePayload(payload);
      fetchMatches(payload);
    } else {
      setIsLoading(false);
      toast({
        title: "No Request Data",
        description: "Please submit an exchange request first.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleRefresh = () => {
    if (exchangePayload) {
      fetchMatches(exchangePayload);
    }
  };

  const willingToExchange = matches.length;

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
