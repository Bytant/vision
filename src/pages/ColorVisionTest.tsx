
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const colorPlates = [
  { 
    background: "bg-[#F4B088]", 
    number: "6", 
    pattern: "circle", 
    colorClass: "text-[#F16851]"
  },
  { 
    background: "bg-[#A3CD87]", 
    number: "8", 
    pattern: "circle",
    colorClass: "text-[#58A63C]" 
  },
  { 
    background: "bg-[#D0D1E4]", 
    number: "15", 
    pattern: "circle",
    colorClass: "text-[#9599D2]" 
  },
  { 
    background: "bg-[#F1C9E2]", 
    number: "29", 
    pattern: "circle",
    colorClass: "text-[#E7679A]" 
  },
  { 
    background: "bg-[#F8DFB3]", 
    number: "74", 
    pattern: "circle",
    colorClass: "text-[#EFB039]" 
  }
];

const ColorVisionTest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [testActive, setTestActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalQuestions = colorPlates.length;
  
  useEffect(() => {
    if (testActive && step < totalQuestions) {
      setProgress((step / totalQuestions) * 100);
    } else if (step === totalQuestions) {
      setTestActive(false);
      calculateResults();
    }
  }, [step, testActive]);
  
  const handleAnswerSubmit = () => {
    if (answer === colorPlates[step].number) {
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
    const colorVisionScore = score / totalQuestions;
    let result = "";
    
    if (colorVisionScore >= 0.8) {
      result = "Your color vision appears to be normal!";
    } else if (colorVisionScore >= 0.6) {
      result = "Your color vision appears to be mostly normal with some mild deficiency.";
    } else {
      result = "You may have some color vision deficiency. We recommend consulting with an eye care professional.";
    }
    
    toast({
      title: "Test Completed",
      description: `Score: ${score}/${totalQuestions}. ${result}`,
      duration: 5000,
    });
    
    // In a full implementation, we would store these results and offer to send them to a professional
    setTimeout(() => {
      navigate("/test-results", { state: { score, totalQuestions, testType: "color-vision", result } });
    }, 2000);
  };
  
  const generateColorDots = () => {
    const currentPlate = colorPlates[step];
    
    return (
      <div className={`w-64 h-64 rounded-full flex items-center justify-center ${currentPlate.background}`}>
        <div className={`text-5xl font-bold ${currentPlate.colorClass}`}>
          {currentPlate.number}
        </div>
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
                Color Vision Test
              </h1>
              
              {!testActive && (
                <Card className="w-full max-w-md p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-dark">Test Instructions</h2>
                    <p className="text-neutral">
                      This test will assess your ability to differentiate between colors, which can help identify potential color vision deficiencies.
                    </p>
                    <ul className="text-sm text-left space-y-2 list-disc list-inside">
                      <li>Make sure your screen brightness is at an appropriate level</li>
                      <li>You'll be shown colored plates with numbers embedded in them</li>
                      <li>Type the number you see in each plate</li>
                      <li>If you can't see a number, make your best guess</li>
                    </ul>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={startTest}
                    >
                      Start Test
                    </Button>
                  </div>
                </Card>
              )}
              
              {testActive && step < totalQuestions && (
                <>
                  <div className="w-full max-w-md mb-8">
                    <Progress value={progress} className="h-2 bg-secondary-light" />
                    <p className="text-xs text-neutral mt-1">Question {step + 1} of {totalQuestions}</p>
                  </div>
                  
                  <Card className="w-full max-w-md p-8">
                    <div className="flex flex-col items-center space-y-8">
                      <div className="text-center">
                        {generateColorDots()}
                      </div>
                      
                      <div className="space-y-4 w-full">
                        <div className="space-y-2">
                          <Label htmlFor="answer">What number do you see?</Label>
                          <Input 
                            id="answer"
                            type="text" 
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)}
                            className="text-center text-xl"
                            placeholder="Enter number"
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90" 
                          onClick={handleAnswerSubmit}
                        >
                          Next
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

export default ColorVisionTest;
