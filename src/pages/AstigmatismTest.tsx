
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AstigmatismTest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [testActive, setTestActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [distance, setDistance] = useState(false);
  
  const totalSteps = 3; // We'll show 3 different starburst patterns
  
  useEffect(() => {
    if (testActive && step < totalSteps) {
      setProgress((step / totalSteps) * 100);
    } else if (step === totalSteps) {
      setTestActive(false);
      calculateResults();
    }
  }, [step, testActive]);
  
  const handleLineSelection = (lineIndex: number) => {
    setSelectedLines(prev => {
      // Toggle selection
      if (prev.includes(lineIndex)) {
        return prev.filter(i => i !== lineIndex);
      } else {
        return [...prev, lineIndex];
      }
    });
  };
  
  const handleNext = () => {
    // Store results for this step (would connect to database in production)
    setStep(step + 1);
    setSelectedLines([]);
  };
  
  const startTest = () => {
    setTestActive(true);
    setStep(0);
    setProgress(0);
    setSelectedLines([]);
  };
  
  const calculateResults = () => {
    // In a real implementation, we would analyze the pattern of selected lines
    // across all steps to determine astigmatism likelihood and axis
    
    let result = "";
    
    if (selectedLines.length > 0) {
      result = "Your responses indicate you may have some degree of astigmatism. We recommend consulting with an eye care professional for a comprehensive evaluation.";
    } else {
      result = "Your responses suggest you likely do not have significant astigmatism. However, regular eye check-ups are still recommended.";
    }
    
    toast({
      title: "Test Completed",
      description: result,
      duration: 5000,
    });
    
    // In a full implementation, we would store these results and offer to send them to a professional
    setTimeout(() => {
      navigate("/test-results", { state: { testType: "astigmatism", result } });
    }, 2000);
  };
  
  const renderStarburstPattern = () => {
    const lines = 12;
    const radius = 120;
    
    return (
      <div className="relative w-64 h-64 mx-auto">
        {Array.from({ length: lines }).map((_, index) => {
          const angle = (index * (360 / lines));
          const isSelected = selectedLines.includes(index);
          
          return (
            <div 
              key={index}
              onClick={() => handleLineSelection(index)}
              className={`absolute top-1/2 left-1/2 h-1 w-${radius} origin-left cursor-pointer transition-all ${isSelected ? 'bg-primary-dark' : 'bg-neutral-dark'} ${isSelected ? 'h-2' : 'h-1'}`}
              style={{ 
                transform: `rotate(${angle}deg)`,
                width: `${radius}px`,
              }}
            />
          );
        })}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-neutral-dark rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-neutral-dark">
                Astigmatism Test
              </h1>
              
              {!testActive && !distance && (
                <Card className="w-full max-w-md p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-dark">Test Instructions</h2>
                    <p className="text-neutral">
                      This test will help identify potential astigmatism by analyzing how you perceive radiating lines.
                    </p>
                    <ul className="text-sm text-left space-y-2 list-disc list-inside">
                      <li>Position yourself about 50 cm (arm's length) from your screen</li>
                      <li>If you wear glasses or contacts, keep them on</li>
                      <li>You'll see a starburst pattern with lines extending from the center</li>
                      <li>Tap or click on any lines that appear darker, blurrier, or more distinct than others</li>
                      <li>If all lines appear equally clear, proceed without selecting any</li>
                    </ul>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={() => setDistance(true)}
                    >
                      I'm at the correct distance
                    </Button>
                  </div>
                </Card>
              )}
              
              {!testActive && distance && (
                <Card className="w-full max-w-md p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-dark">Ready to Begin?</h2>
                    <p className="text-neutral">
                      You'll see three different starburst patterns. For each one, select any lines that appear darker or more distinct.
                    </p>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={startTest}
                    >
                      Start Test
                    </Button>
                  </div>
                </Card>
              )}
              
              {testActive && step < totalSteps && (
                <>
                  <div className="w-full max-w-md mb-8">
                    <Progress value={progress} className="h-2 bg-secondary-light" />
                    <p className="text-xs text-neutral mt-1">Step {step + 1} of {totalSteps}</p>
                  </div>
                  
                  <Card className="w-full max-w-md p-8">
                    <div className="flex flex-col items-center space-y-8">
                      <div className="text-center">
                        <p className="mb-4 text-neutral">
                          Click on any lines that appear darker, blurrier, or more distinct than others:
                        </p>
                        {renderStarburstPattern()}
                      </div>
                      
                      <div className="w-full">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90" 
                          onClick={handleNext}
                        >
                          {selectedLines.length === 0 ? "All lines appear equal" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AstigmatismTest;
