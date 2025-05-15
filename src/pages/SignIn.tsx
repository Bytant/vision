
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignInForm from "../components/auth/SignInForm";
import { Card } from "@/components/ui/card";

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center">
              <Card className="w-full max-w-md">
                <SignInForm />
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
