import { UserCheck, Database, Cpu, BarChart3, Target, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: UserCheck,
    title: "Passenger Login",
    description: "Passengers log in using their Name and PNR number to access the system.",
    color: "primary",
  },
  {
    icon: Database,
    title: "Request Collection",
    description: "Seat exchange requests are collected from multiple users on the same train.",
    color: "primary",
  },
  {
    icon: Cpu,
    title: "ML Comparison",
    description: "Machine learning compares the requester with all other passengers in the database.",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Probability Calculation",
    description: "Acceptance probabilities are calculated using features like gender compatibility, seat benefit, coach proximity, group size, and journey duration.",
    color: "accent",
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Only high-probability matches are shown to reduce unnecessary requests and improve success rates.",
    color: "success",
  },
];

const getIconStyle = (color: string) => {
  switch (color) {
    case "primary":
      return "gradient-primary text-primary-foreground shadow-lg shadow-primary/20";
    case "accent":
      return "gradient-accent text-accent-foreground shadow-lg shadow-accent/20";
    case "success":
      return "bg-success text-success-foreground shadow-lg shadow-success/20";
    default:
      return "bg-primary text-primary-foreground";
  }
};

const getBadgeStyle = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-primary text-primary-foreground";
    case "accent":
      return "bg-accent text-accent-foreground";
    case "success":
      return "bg-success text-success-foreground";
    default:
      return "bg-primary text-primary-foreground";
  }
};

const HowAIWorks = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Machine Learning Powered</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            How <span className="text-gradient">AI</span> Works
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our intelligent system uses machine learning to find the best seat exchange matches
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-2 border-border/50 bg-card shadow-md transition-all hover:border-primary/30 hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 transition-transform group-hover:scale-150" />
              <CardContent className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getIconStyle(step.color)} transition-transform group-hover:scale-110`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${getBadgeStyle(step.color)}`}>
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
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