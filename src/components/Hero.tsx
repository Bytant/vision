
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGetStarted = () => {
    if (user) {
      navigate("/tests");
    } else {
      navigate("/signup");
    }
  };
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-neutral-dark">
                Online Vision Testing & Care
              </h1>
              <p className="max-w-[600px] text-neutral md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Fast, reliable vision tests from the comfort of your home. Get AI-powered insights and connect with specialists for personalized care.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate("/learn-more")}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="mx-auto flex justify-center lg:justify-end">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="Person taking an online vision test"
                className="object-cover rounded-full bg-secondary-light p-2"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
