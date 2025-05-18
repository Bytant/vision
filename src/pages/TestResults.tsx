import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ArrowRight, Printer, CalendarPlus, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { printTestResults } from "@/utils/printResults";

const TestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, testType, testResult } = location.state || {};
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const getTestTitle = () => {
    switch(testType) {
      case "visual-acuity": return "Visual Acuity Test";
      case "color-vision": return "Color Vision Test";
      case "astigmatism": return "Astigmatism Test";
      case "contrast-sensitivity": return "Contrast Sensitivity Test";
      case "cataract": return "Cataract Screening Test";
      default: return "Vision Test";
    }
  };
  
  const getAIRecommendations = () => {
    const percentage = (score / totalQuestions) * 100;
    
    if (testType === "visual-acuity") {
      if (percentage >= 90) {
        return {
          status: "Excellent",
          recommendation: "Your vision appears to be excellent. Regular eye check-ups are still recommended once every 1-2 years.",
          urgency: "low",
          nextSteps: [
            "Schedule a routine eye examination within the next 1-2 years",
            "Continue to protect your eyes from UV exposure with proper sunglasses",
            "Take regular breaks when using digital screens (follow the 20-20-20 rule)"
          ]
        };
      } else if (percentage >= 75) {
        return {
          status: "Good",
          recommendation: "Your vision appears to be good. Consider an eye examination within the next year to ensure optimal vision.",
          urgency: "low",
          nextSteps: [
            "Schedule an eye examination within the next 12 months",
            "Be mindful of eye strain when using digital devices",
            "Ensure proper lighting when reading or doing detailed work"
          ]
        };
      } else if (percentage >= 50) {
        return {
          status: "Fair",
          recommendation: "You may benefit from corrective lenses. We recommend consulting with an optometrist within the next 3 months.",
          urgency: "medium",
          nextSteps: [
            "Schedule an appointment with an optometrist within the next 3 months",
            "Be cautious when driving, especially at night or in poor weather conditions",
            "Consider adjusting font sizes on digital devices for easier reading"
          ]
        };
      } else {
        return {
          status: "Needs Attention",
          recommendation: "We strongly recommend scheduling an appointment with an eye care professional as soon as possible for a comprehensive examination.",
          urgency: "high",
          nextSteps: [
            "Schedule an appointment with an eye care professional within the next 2-4 weeks",
            "Consider having someone accompany you when driving until you've had a proper examination",
            "Bring these test results to your appointment to help guide your eye care professional"
          ]
        };
      }
    } else if (testType === "color-vision") {
      if (percentage >= 80) {
        return {
          status: "Normal",
          recommendation: "Your color perception appears to be normal. No specific follow-up is needed for color vision.",
          urgency: "low",
          nextSteps: [
            "Continue with regular eye check-ups as recommended",
            "No specific action needed regarding color vision"
          ]
        };
      } else if (percentage >= 60) {
        return {
          status: "Mild Deficiency",
          recommendation: "You may have a mild color vision deficiency. Consider mentioning this during your next routine eye examination.",
          urgency: "low",
          nextSteps: [
            "Mention your color vision test results at your next eye examination",
            "Be aware that certain colors may be difficult to distinguish in your daily activities",
            "Consider color-identification apps for situations where color discrimination is important"
          ]
        };
      } else {
        return {
          status: "Potential Deficiency",
          recommendation: "Your results suggest a possible color vision deficiency. This is not typically correctable but specialized lenses may help in some cases. Consult with an eye specialist for proper diagnosis.",
          urgency: "medium",
          nextSteps: [
            "Schedule an appointment with an eye specialist for a comprehensive color vision assessment",
            "Research assistive technologies that may help with color identification",
            "Inform important people in your life about your potential color vision challenges"
          ]
        };
      }
    }
    
    return {
      status: "Needs Review",
      recommendation: "Based on your results, we recommend consulting with an eye care professional for a comprehensive evaluation.",
      urgency: "medium",
      nextSteps: [
        "Schedule an appointment with an eye care professional within the next month",
        "Bring these test results to your appointment"
      ]
    };
  };
  
  const handlePrintResults = async () => {
    const result = await printTestResults('test-results-card', {
      testType: getTestTitle(),
      score,
      totalQuestions,
      result: testResult,
      testDate: new Date().toLocaleDateString()
    });
    
    if (result) {
      toast({
        title: "PDF Generated",
        description: "Your test results have been downloaded as a PDF."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate PDF. Please try again."
      });
    }
  };
  
  if (!score && score !== 0) {
    // Redirect if no test data
    setTimeout(() => navigate("/tests"), 100);
    return null;
  }
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  const analysis = getAIRecommendations();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-neutral-dark">
                  {getTestTitle()} Results
                </h1>
                <p className="text-neutral md:text-lg">
                  Review your test results and get AI-powered recommendations
                </p>
              </div>
              
              <Card className="w-full max-w-2xl" id="test-results-card" ref={resultsRef}>
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-light rounded-full">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center">Your Score: {score}/{totalQuestions} ({scorePercentage}%)</CardTitle>
                  <CardDescription className="text-center text-base mt-2">{testResult}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-6 pt-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-neutral-dark">AI-Powered Analysis</h3>
                      <span className={`text-sm font-medium py-1 px-3 rounded-full ${
                        analysis.urgency === 'high' ? 'bg-red-100 text-red-800' : 
                        analysis.urgency === 'medium' ? 'bg-amber-100 text-amber-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {analysis.status}
                      </span>
                    </div>
                    
                    <div className="bg-secondary-light p-4 rounded-md">
                      <p className="text-sm md:text-base text-left">{analysis.recommendation}</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 text-neutral-dark">Recommended Next Steps:</h4>
                      <ul className="space-y-2 list-disc list-inside text-sm text-neutral">
                        {analysis.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={handlePrintResults}
                      >
                        <Printer className="h-4 w-4" />
                        Print Results
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        Share Results
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <CalendarPlus className="h-4 w-4" />
                        Find Eye Doctor
                      </Button>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="text-sm text-neutral">
                        <h4 className="font-semibold mb-2 text-neutral-dark">Important Disclaimer:</h4>
                        <p>
                          This online test provides a preliminary assessment only and is not a substitute for a comprehensive eye examination by a healthcare professional. For accurate diagnosis and treatment, please consult with an optometrist or ophthalmologist.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={() => navigate("/tests")}
                  >
                    Take Another Test
                  </Button>
                  <Button 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestResults;
