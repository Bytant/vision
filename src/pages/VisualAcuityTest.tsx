
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const letters = ["E", "F", "P", "T", "O", "Z", "L", "D"];
const sizes = [72, 60, 48, 36, 28, 22, 18, 14];
const directions = ["normal", "rotateZ-90", "rotateZ-180", "rotateZ-270"];

const VisualAcuityTest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentDirection, setCurrentDirection] = useState("");
  const [testActive, setTestActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalQuestions] = useState(8);
  const [distance, setDistance] = useState(false);
  
  useEffect(() => {
    if (testActive && step < totalQuestions) {
      generateQuestion();
      setProgress((step / totalQuestions) * 100);
    } else if (step === totalQuestions) {
      setTestActive(false);
      calculateResults();
    }
  }, [step, testActive]);
  
  const generateQuestion = () => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    setCurrentLetter(randomLetter);
    setCurrentDirection(randomDirection);
  };
  
  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    setStep(step + 1);
  };
  
  const startTest = () => {
    setTestActive(true);
    setStep(0);
    setScore(0);
    setProgress(0);
  };
  
  const calculateResults = () => {
    const acuityScore = score / totalQuestions;
    let result = "";
    
    if (acuityScore >= 0.9) {
      result = "Your visual acuity appears to be excellent!";
    } else if (acuityScore >= 0.75) {
      result = "Your visual acuity appears to be good.";
    } else if (acuityScore >= 0.5) {
      result = "Your visual acuity may benefit from corrective lenses or further evaluation.";
    } else {
      result = "We recommend consulting with an eye care professional for a comprehensive assessment.";
    }
    
    toast({
      title: "Test Completed",
      description: `Score: ${score}/${totalQuestions}. ${result}`,
      duration: 5000,
    });
    
    // In a full implementation, we would store these results and offer to send them to a professional
    setTimeout(() => {
      navigate("/test-results", { state: { score, totalQuestions, testType: "visual-acuity", result } });
    }, 2000);
  };
  
  const getTransformClass = () => {
    switch(currentDirection) {
      case "rotateZ-90": return "rotate-90";
      case "rotateZ-180": return "rotate-180";
      case "rotateZ-270": return "-rotate-90";
      default: return "";
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-neutral-dark">
                Visual Acuity Test
              </h1>
              
              {!testActive && !distance && (
                <Card className="w-full max-w-md p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-dark">Test Instructions</h2>
                    <p className="text-neutral">
                      This test will assess how clearly you can see from a distance by displaying letters of decreasing size.
                    </p>
                    <ul className="text-sm text-left space-y-2 list-disc list-inside">
                      <li>Position yourself about 2 meters away from your screen</li>
                      <li>If you wear glasses or contacts for distance vision, keep them on</li>
                      <li>You'll be shown a series of letters in different orientations</li>
                      <li>Identify the direction in which the letter is pointing</li>
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
                      You'll have a few seconds to identify each letter before selecting its orientation.
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
              
              {testActive && step < totalQuestions && (
                <>
                  <div className="w-full max-w-md mb-8">
                    <Progress value={progress} className="h-2 bg-secondary-light" />
                    <p className="text-xs text-neutral mt-1">Question {step + 1} of {totalQuestions}</p>
                  </div>
                  
                  <Card className="w-full max-w-md p-8">
                    <div className="flex flex-col items-center space-y-8">
                      <div className="text-center">
                        <span 
                          className={`inline-block font-bold ${getTransformClass()}`}
                          style={{ fontSize: `${sizes[step]}px` }}
                        >
                          E
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 w-full">
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto"
                          onClick={() => handleAnswerSubmit(currentDirection === "normal")}
                        >
                          <span className="text-2xl">→</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto"
                          onClick={() => handleAnswerSubmit(currentDirection === "rotateZ-270")}
                        >
                          <span className="text-2xl">↑</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto"
                          onClick={() => handleAnswerSubmit(currentDirection === "rotateZ-180")}
                        >
                          <span className="text-2xl">←</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto"
                          onClick={() => handleAnswerSubmit(currentDirection === "rotateZ-90")}
                        >
                          <span className="text-2xl">↓</span>
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

export default VisualAcuityTest;
