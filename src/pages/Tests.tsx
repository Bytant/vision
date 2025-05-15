
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Eye, Glasses, Microscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Tests = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-neutral-dark">
                  Online Vision Tests
                </h1>
                <p className="max-w-[700px] text-neutral md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our clinically-informed vision tests to assess your visual health from the comfort of your home.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-light rounded-full">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">Visual Acuity Test</CardTitle>
                  <CardDescription className="text-center">
                    Test how clearly you can see from a distance
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-neutral">
                  <p>This test simulates the standard Snellen chart used by eye care professionals to measure your visual acuity.</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/tests/visual-acuity")}
                  >
                    Start Test
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-light rounded-full">
                      <Glasses className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">Color Vision Test</CardTitle>
                  <CardDescription className="text-center">
                    Check for color blindness and color vision deficiencies
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-neutral">
                  <p>This test helps identify potential color vision deficiencies using Ishihara-inspired color plates.</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/tests/color-vision")}
                  >
                    Start Test
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-light rounded-full">
                      <Microscope className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">Astigmatism Test</CardTitle>
                  <CardDescription className="text-center">
                    Check for signs of astigmatism
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-neutral">
                  <p>This test helps detect potential irregularities in your cornea or lens that may cause blurred vision.</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/tests/astigmatism")}
                  >
                    Start Test
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

export default Tests;
