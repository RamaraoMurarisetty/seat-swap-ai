import { CheckCircle2, XCircle, Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PredictionResultProps {
  result: {
    acceptance_probability: number;
    decision: string;
  };
}

const PredictionResult = ({ result }: PredictionResultProps) => {
  const probability = Math.round(result.acceptance_probability * 100);
  const isPositive = result.decision.toLowerCase().includes("send");

  return (
    <Card className={`animate-slide-up border-2 shadow-lg ${
      isPositive ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
    }`}>
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-md">
          {isPositive ? (
            <CheckCircle2 className="h-10 w-10 text-success" />
          ) : (
            <XCircle className="h-10 w-10 text-destructive" />
          )}
        </div>
        <CardTitle className={`text-2xl font-bold ${
          isPositive ? "text-success" : "text-destructive"
        }`}>
          {result.decision}
        </CardTitle>
        <CardDescription>AI Prediction Result</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Probability Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Acceptance Probability
            </span>
            <span className={`text-2xl font-bold ${
              isPositive ? "text-success" : "text-destructive"
            }`}>
              {probability}%
            </span>
          </div>
          <Progress 
            value={probability} 
            className={`h-4 ${isPositive ? "[&>div]:bg-success" : "[&>div]:bg-destructive"}`}
          />
        </div>

        {/* AI Explanation */}
        <div className="rounded-lg bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Brain className="h-4 w-4 text-primary" />
            AI Analysis
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Prediction is based on seat benefit, coach proximity, group size compatibility, 
            and journey duration. {isPositive 
              ? "The conditions are favorable for a successful exchange request." 
              : "Consider adjusting your parameters for better chances."}
          </p>
        </div>

        {/* Tips */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Pro Tip:</strong> Same coach exchanges and 
            gender-matched requests typically have higher acceptance rates.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
