import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  pnr: z.string().regex(/^\d{10}$/, "PNR must be exactly 10 digits"),
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pnr: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = registerUser(data.name, data.pnr);

    if (success) {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please login to continue.",
      });
      navigate("/login");
    } else {
      toast({
        title: "Registration Failed",
        description: "A passenger with this PNR already exists. Please login instead.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Register | Smart Seat Exchange</title>
        <meta name="description" content="Register for Indian Railways Smart Seat Exchange system" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <Card className="w-full max-w-md border-2 border-border/50 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-lg">
              <Train className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Passenger Registration</CardTitle>
              <CardDescription className="mt-2">
                Create an account to request seat exchanges
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pnr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">PNR Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 10-digit PNR"
                          maxLength={10}
                          className="h-12 font-mono tracking-wider"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your 10-digit IRCTC PNR number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      Register
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register;
