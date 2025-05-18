
import { Eye, Glasses, Microscope, Camera } from "lucide-react";

const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-neutral-dark">
              Comprehensive Vision Care
            </h2>
            <p className="max-w-[700px] text-neutral md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers a variety of tests to assess your visual health and provide actionable insights.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all">
            <div className="p-4 bg-primary-light rounded-full">
              <Eye className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark">Visual Acuity Tests</h3>
            <p className="text-neutral text-center">
              Measure how clearly you can see from different distances with our Snellen chart test.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all">
            <div className="p-4 bg-primary-light rounded-full">
              <Glasses className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark">Color Vision Assessment</h3>
            <p className="text-neutral text-center">
              Evaluate how well you perceive colors and identify potential color blindness issues.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all">
            <div className="p-4 bg-primary-light rounded-full">
              <Camera className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark">Cataract Screening</h3>
            <p className="text-neutral text-center">
              Screen for potential cataracts using our advanced CNN-powered image analysis technology.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all">
            <div className="p-4 bg-primary-light rounded-full">
              <Microscope className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark">AI-Powered Analysis</h3>
            <p className="text-neutral text-center">
              Receive immediate insights about your vision health with our advanced AI technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
