
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpForm from "../components/auth/SignUpForm";
import { Card } from "@/components/ui/card";

const SignUp = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center">
              <Card className="w-full max-w-md">
                <SignUpForm />
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
