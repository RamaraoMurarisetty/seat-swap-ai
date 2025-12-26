import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import PredictionResult from "./PredictionResult";

const formSchema = z.object({
  genderMatch: z.boolean(),
  seatUpgrade: z.boolean(),
  coachDistance: z.coerce.number().min(0, "Must be 0 or greater"),
  requesterGroupSize: z.coerce.number().min(1, "Must be at least 1"),
  travelDuration: z.coerce.number().min(0.5, "Must be at least 0.5 hours"),
});

type FormValues = z.infer<typeof formSchema>;

interface PredictionResponse {
  acceptance_probability: number;
  decision: string;
}

const ExchangeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genderMatch: false,
      seatUpgrade: false,
      coachDistance: 0,
      requesterGroupSize: 1,
      travelDuration: 2,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gender_match: data.genderMatch ? 1 : 0,
          seat_upgrade: data.seatUpgrade ? 1 : 0,
          coach_distance: data.coachDistance,
          requester_group_size: data.requesterGroupSize,
          travel_duration: data.travelDuration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result: PredictionResponse = await response.json();
      setResult(result);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the prediction server. Please ensure the Flask API is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-2 border-border/50 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Exchange Request Details</CardTitle>
          <CardDescription>
            Fill in the details below to predict the acceptance probability of your seat exchange request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Toggle Fields */}
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="genderMatch"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium">Gender Match</FormLabel>
                        <FormDescription className="text-sm">
                          Is the other passenger same gender?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seatUpgrade"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium">Seat Upgrade</FormLabel>
                        <FormDescription className="text-sm">
                          Upgrading from Upper to Lower?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Number Fields */}
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="coachDistance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Coach Distance</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0 for same coach"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Number of coaches between seats (0 = same coach)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Travel Duration (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0.5}
                          step={0.5}
                          placeholder="e.g., 4"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Total journey duration in hours
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="requesterGroupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Your Group Size</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="1"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Number of people travelling with you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Check Acceptance Probability
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && <PredictionResult result={result} />}
    </div>
  );
};

export default ExchangeForm;
