import { UserCheck, Database, Cpu, BarChart3, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: UserCheck,
    title: "Passenger Login",
    description: "Passengers log in using their Name and PNR number to access the system.",
  },
  {
    icon: Database,
    title: "Request Collection",
    description: "Seat exchange requests are collected from multiple users on the same train.",
  },
  {
    icon: Cpu,
    title: "ML Comparison",
    description: "Machine learning compares the requester with all other passengers in the database.",
  },
  {
    icon: BarChart3,
    title: "Probability Calculation",
    description: "Acceptance probabilities are calculated using features like gender compatibility, seat benefit, coach proximity, group size, and journey duration.",
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Only high-probability matches are shown to reduce unnecessary requests and improve success rates.",
  },
];

const HowAIWorks = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            How AI Works
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Our intelligent system uses machine learning to find the best seat exchange matches
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowAIWorks;
