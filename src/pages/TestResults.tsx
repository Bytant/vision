
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ArrowRight } from "lucide-react";

const TestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, testType, result } = location.state || {};
  
  const getTestTitle = () => {
    switch(testType) {
      case "visual-acuity": return "Visual Acuity Test";
      case "color-vision": return "Color Vision Test";
      case "astigmatism": return "Astigmatism Test";
      default: return "Vision Test";
    }
  };
  
  const getAIRecommendations = () => {
    const percentage = (score / totalQuestions) * 100;
    
    if (testType === "visual-acuity") {
      if (percentage >= 90) {
        return "Your vision appears to be excellent. Regular eye check-ups are still recommended once every 1-2 years.";
      } else if (percentage >= 75) {
        return "Your vision appears to be good. Consider an eye examination within the next year to ensure optimal vision.";
      } else if (percentage >= 50) {
        return "You may benefit from corrective lenses. We recommend consulting with an optometrist within the next 3 months.";
      } else {
        return "We strongly recommend scheduling an appointment with an eye care professional as soon as possible for a comprehensive examination.";
      }
    } else if (testType === "color-vision") {
      if (percentage >= 80) {
        return "Your color perception appears to be normal. No specific follow-up is needed for color vision.";
      } else if (percentage >= 60) {
        return "You may have a mild color vision deficiency. Consider mentioning this during your next routine eye examination.";
      } else {
        return "Your results suggest a possible color vision deficiency. This is not typically correctable but specialized lenses may help in some cases. Consult with an eye specialist for proper diagnosis.";
      }
    }
    
    return "Based on your results, we recommend consulting with an eye care professional for a comprehensive evaluation.";
  };
  
  if (!score && score !== 0) {
    // Redirect if no test data
    setTimeout(() => navigate("/tests"), 100);
    return null;
  }
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  
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
              
              <Card className="w-full max-w-2xl">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-light rounded-full">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center">Your Score: {score}/{totalQuestions} ({scorePercentage}%)</CardTitle>
                  <CardDescription className="text-center text-base mt-2">{result}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-6 pt-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-neutral-dark">AI-Powered Analysis</h3>
                    <div className="bg-secondary-light p-4 rounded-md">
                      <p className="text-sm md:text-base text-left">{getAIRecommendations()}</p>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="text-sm text-neutral">
                        <h4 className="font-semibold mb-2 text-neutral-dark">Important Note:</h4>
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
