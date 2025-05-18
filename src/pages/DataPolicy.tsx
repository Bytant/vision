
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Database, FileText } from "lucide-react";

const DataPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <Shield className="h-12 w-12 text-primary" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-neutral-dark">
                Data Privacy Policy
              </h1>
              <p className="text-neutral md:text-xl max-w-[800px]">
                At EyeVision Care, we prioritize the privacy and security of your personal and medical information. 
                Learn how we collect, use, and protect your data.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              <Card>
                <CardHeader className="pb-2">
                  <Lock className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Security First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral">
                    We use industry-standard encryption and security measures to protect all your data 
                    from unauthorized access, maintaining the highest level of security and confidentiality.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Database className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Data Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral">
                    Your test results and personal information are stored securely in our encrypted database, 
                    with access limited only to authorized healthcare professionals.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Your Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral">
                    You have complete control over your data. Access your information anytime, download test results,
                    and request deletion of your data if needed.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8 max-w-3xl mx-auto">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">What Data We Collect</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc list-inside space-y-2 text-neutral">
                    <li>Account information (name, email address)</li>
                    <li>Vision test results and assessments</li>
                    <li>Eye images for cataract screening (processed locally, not stored on our servers)</li>
                    <li>Device information for optimal app performance</li>
                    <li>Usage data to improve our services</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">How We Use Your Data</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc list-inside space-y-2 text-neutral">
                    <li>To provide accurate vision test results</li>
                    <li>To create personalized health recommendations</li>
                    <li>To improve our tests and services</li>
                    <li>To communicate important updates about your eye health</li>
                    <li>For research purposes (only with anonymized data)</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Data Sharing & Confidentiality</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-neutral mb-4">
                    Your privacy is our priority. We never sell or share your personal data with third parties for marketing purposes.
                  </p>
                  <p className="text-neutral mb-4">
                    <strong>Limited Sharing:</strong> Your data is only shared with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral">
                    <li>Healthcare providers you explicitly authorize</li>
                    <li>Service providers who help operate our platform (with strict confidentiality agreements)</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Your Rights</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-neutral mb-4">
                    As our user, you have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral">
                    <li>Access your personal data</li>
                    <li>Download and print your test results</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of certain data processing activities</li>
                  </ul>
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

export default DataPolicy;
