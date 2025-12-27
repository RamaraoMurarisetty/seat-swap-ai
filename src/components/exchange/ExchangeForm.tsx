import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  genderMatch: z.boolean(),
  seatUpgrade: z.boolean(),
  coachDistance: z.coerce.number().min(0, "Must be 0 or greater"),
  groupSize: z.coerce.number().min(1, "Must be at least 1"),
  travelHours: z.coerce.number().min(1, "Must be at least 1 hour"),
});

type FormValues = z.infer<typeof formSchema>;

const ExchangeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { submitRequest } = useAuth();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genderMatch: false,
      seatUpgrade: false,
      coachDistance: 0,
      groupSize: 1,
      travelHours: 2,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const payload = {
      gender_match: data.genderMatch ? 1 : 0,
      seat_upgrade: data.seatUpgrade ? 1 : 0,
      coach_distance: data.coachDistance,
      group_size: data.groupSize,
      travel_hours: data.travelHours,
    };

    // First submit the request to the backend
    const result = await submitRequest(payload);
    
    if (result.success) {
      toast({
        title: "Request Submitted",
        description: "Finding exchange matches...",
      });
      // Navigate to matches page
      navigate("/matches");
    } else {
      toast({
        title: "Submission Failed",
        description: result.error || "Failed to submit request",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
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
                  name="travelHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Travel Duration (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
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
                  name="groupSize"
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
                    Finding Matches...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Find Exchange Matches
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  );
};

export default ExchangeForm;
