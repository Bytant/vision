
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const contrastLevels = [
  { level: 100, text: "C" },
  { level: 50, text: "F" },
  { level: 25, text: "R" },
  { level: 15, text: "K" },
  { level: 10, text: "D" },
  { level: 5, text: "N" },
  { level: 2.5, text: "Z" },
  { level: 1.25, text: "H" },
];

const ContrastSensitivityTest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [testActive, setTestActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [distance, setDistance] = useState(false);
  const totalSteps = contrastLevels.length;
  
  useEffect(() => {
    if (testActive && step < totalSteps) {
      setProgress((step / totalSteps) * 100);
    } else if (step === totalSteps) {
      setTestActive(false);
      calculateResults();
    }
  }, [step, testActive]);
  
  const handleAnswerSubmit = () => {
    if (answer.toUpperCase() === contrastLevels[step].text) {
      setScore(score + 1);
    }
    
    setAnswer("");
    setStep(step + 1);
  };
  
  const startTest = () => {
    setTestActive(true);
    setStep(0);
    setScore(0);
    setProgress(0);
    setAnswer("");
  };
  
  const calculateResults = () => {
    const contrastScore = score / totalSteps;
    let result = "";
    
    if (contrastScore >= 0.8) {
      result = "Your contrast sensitivity appears to be excellent!";
    } else if (contrastScore >= 0.6) {
      result = "Your contrast sensitivity appears to be good.";
    } else if (contrastScore >= 0.4) {
      result = "Your contrast sensitivity may benefit from further evaluation.";
    } else {
      result = "We recommend consulting with an eye care professional for a comprehensive assessment of your contrast sensitivity.";
    }
    
    toast({
      title: "Test Completed",
      description: `Score: ${score}/${totalSteps}. ${result}`,
      duration: 5000,
    });
    
    // In a full implementation, we would store these results and offer to send them to a professional
    setTimeout(() => {
      navigate("/test-results", { state: { score, totalSteps, testType: "contrast-sensitivity", result } });
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-neutral-dark">
                Contrast Sensitivity Test
              </h1>
              
              {!testActive && !distance && (
                <Card className="w-full max-w-md p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-dark">Test Instructions</h2>
                    <p className="text-neutral">
                      This test will assess how well you can distinguish letters at decreasing levels of contrast.
                    </p>
                    <ul className="text-sm text-left space-y-2 list-disc list-inside">
                      <li>Position yourself about 50 cm (arm's length) from your screen</li>
                      <li>Ensure your screen brightness is at a comfortable level</li>
                      <li>If you wear glasses or contacts, keep them on</li>
                      <li>You'll be shown letters with decreasing contrast against the background</li>
                      <li>Type the letter you see in each image</li>
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
                      You'll see letters with decreasing contrast. Identify each letter as best you can.
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
                      <div 
                        className="w-40 h-40 flex items-center justify-center border border-gray-200 rounded-lg"
                      >
                        <span 
                          className="text-7xl font-bold"
                          style={{ 
                            color: `rgba(0, 0, 0, ${contrastLevels[step].level / 100})`,
                          }}
                        >
                          {contrastLevels[step].text}
                        </span>
                      </div>
                      
                      <div className="space-y-4 w-full">
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value.slice(0, 1))}
                            className="px-4 py-2 border border-gray-300 rounded-md flex-1 text-center text-2xl uppercase"
                            maxLength={1}
                            placeholder="?"
                            autoFocus
                          />
                          <Button
                            className="bg-primary hover:bg-primary/90 px-8"
                            onClick={handleAnswerSubmit}
                          >
                            Next
                          </Button>
                        </div>
                        <p className="text-xs text-neutral">Enter the letter you see above or your best guess</p>
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

export default ContrastSensitivityTest;
