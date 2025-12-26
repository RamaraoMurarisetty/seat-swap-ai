import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Smart Seat Exchange for Indian Railways | AI-Powered Predictions</title>
        <meta 
          name="description" 
          content="Request seat exchanges securely using AI predictions. Our intelligent system analyzes multiple factors to predict the likelihood of your exchange request being accepted."
        />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
