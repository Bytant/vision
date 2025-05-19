
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
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
                  About EyeVision Care
                </h1>
                <p className="max-w-[700px] text-neutral md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to make vision care accessible to everyone through technology
                </p>
              </div>
            </div>
            
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center mt-12">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">Our Story</h2>
                  <p className="text-neutral">
                    EyeVision Care was founded with a simple mission: to make basic vision testing accessible to everyone, regardless of location or circumstances. We believe that early detection of vision problems can prevent more serious conditions and improve quality of life.
                  </p>
                  <p className="text-neutral">
                    Our platform combines clinical knowledge with modern technology to provide reliable vision assessments from the comfort of your home. While our tests are not a replacement for professional care, they serve as a valuable first step in identifying potential vision issues.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-neutral-dark mt-8">Our Technology</h2>
                  <p className="text-neutral">
                    We use advanced AI algorithms to analyze test results and provide preliminary insights about your vision health. Our tests are designed based on the standard protocols used by eye care professionals worldwide, adapted for digital delivery.
                  </p>
                  
                  <div className="pt-4">
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => navigate("/tests")}
                    >
                      Try Our Vision Tests
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-2">
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
                    alt="Eye doctor examining patient's eyes"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                  <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-2">
                    <span className="text-primary text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-dark">Accessibility</h3>
                  <p className="text-neutral">Making vision care available to everyone, everywhere</p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                  <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-2">
                    <span className="text-primary text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-dark">Innovation</h3>
                  <p className="text-neutral">Using technology to improve healthcare delivery and outcomes</p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                  <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-2">
                    <span className="text-primary text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-dark">Education</h3>
                  <p className="text-neutral">Empowering users with knowledge about their vision health</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
