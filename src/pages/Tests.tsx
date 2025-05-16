
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Palette, Grid, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tests = () => {
  const navigate = useNavigate();

  const testCards = [
    {
      title: "Visual Acuity Test",
      description: "Assess how clearly you can see from a distance",
      icon: <Eye className="h-6 w-6" />,
      path: "/tests/visual-acuity",
      time: "2-3 minutes",
      buttonText: "Start Test"
    },
    {
      title: "Color Vision Test",
      description: "Test your ability to distinguish between colors",
      icon: <Palette className="h-6 w-6" />,
      path: "/tests/color-vision",
      time: "2-3 minutes",
      buttonText: "Start Test"
    },
    {
      title: "Astigmatism Test",
      description: "Detect potential astigmatism in your vision",
      icon: <Grid className="h-6 w-6" />,
      path: "/tests/astigmatism",
      time: "1-2 minutes",
      buttonText: "Start Test"
    },
    {
      title: "Contrast Sensitivity Test",
      description: "Measure your ability to distinguish objects from their background",
      icon: <Activity className="h-6 w-6" />,
      path: "/tests/contrast-sensitivity",
      time: "2-3 minutes",
      buttonText: "Start Test"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-neutral-dark">
                Available Vision Tests
              </h1>
              <p className="mt-4 text-lg text-neutral max-w-3xl mx-auto">
                Choose from our range of scientifically-designed vision tests to assess different aspects of your visual health
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testCards.map((card, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="bg-primary/5 flex flex-row items-center gap-4 pb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {card.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription className="text-sm">Duration: {card.time}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 flex flex-col h-40">
                    <p className="flex-grow">{card.description}</p>
                    <Button 
                      className="mt-4 bg-primary hover:bg-primary/90 w-full" 
                      onClick={() => navigate(card.path)}
                    >
                      {card.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => navigate('/learn-more')}
              >
                Learn More About Our Tests
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tests;
