
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Smartphone, Monitor, Ruler } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LearnMore = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-primary-light">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-neutral-dark">
                Learn More About Our Vision Tests
              </h1>
              <p className="mt-4 text-lg text-neutral max-w-3xl mx-auto">
                Understand how our vision tests work, how to prepare for them, and what the results mean.
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg border mb-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-amber-500 h-6 w-6" />
                <h2 className="text-lg font-medium">Important Disclaimer</h2>
              </div>
              <p className="text-neutral">
                EyeVision Care's online vision tests are designed for screening purposes only and are not a substitute for a comprehensive 
                eye examination by a qualified healthcare professional. These tests cannot diagnose eye conditions or diseases. 
                Please consult with an optometrist or ophthalmologist for proper diagnosis and treatment recommendations.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" /> Desktop Device Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                        alt="Person using desktop computer at correct distance" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="bg-gray-50 p-2 text-xs text-center border-t">
                      Maintain approximately 60 cm (24 inches) from your screen
                    </div>
                  </div>

                  <p>
                    For optimal results when taking our vision tests on a desktop computer or laptop, please follow these guidelines:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sit approximately 60 cm (24 inches) from your screen</li>
                    <li>Ensure your screen is clean and free from glare</li>
                    <li>Adjust your screen brightness to a comfortable level</li>
                    <li>If you normally wear glasses or contacts for distance viewing, wear them during the test</li>
                    <li>Take the test in a well-lit room, but avoid direct light on your screen</li>
                    <li>Ensure your screen resolution is set to the recommended settings for your display</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" /> Mobile Device Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Person holding mobile device at arm's length" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="bg-gray-50 p-2 text-xs text-center border-t">
                      Hold your device at arm's length (40-50 cm)
                    </div>
                  </div>

                  <p>
                    When using a mobile device for our vision tests, please follow these additional instructions:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Hold your device at arm's length (approximately 40-50 cm)</li>
                    <li>Ensure maximum screen brightness</li>
                    <li>Disable auto-rotation and hold your device in portrait orientation</li>
                    <li>Use your device in a well-lit environment without screen glare</li>
                    <li>If possible, use a device with a larger screen (tablet preferred over phone)</li>
                    <li>Avoid taking tests while moving or in a vehicle</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 space-y-4">
              <Card className="p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <Ruler className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Proper Testing Distance</h2>
                  </div>
                  <p className="mb-4">
                    Maintaining the correct distance from your screen is crucial for accurate test results. You should be:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Desktop/laptop:</strong> 60 cm (24 inches) from screen</li>
                    <li><strong>Mobile/tablet:</strong> 40-50 cm (arm's length) from screen</li>
                  </ul>
                  <p className="mt-4 text-sm text-neutral italic">
                    Tip: Use a measuring tape once to get a feel for the correct distance, then use visual landmarks to maintain that distance during tests.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                        alt="Proper testing distance diagram" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-bold text-center">Our Vision Tests</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Visual Acuity Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Visual Acuity Test evaluates how clearly you can see from a distance. It's similar to the standard 
                    Snellen chart used by eye care professionals.
                  </p>
                  
                  <h3 className="font-semibold mt-4">How to Take the Test:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Position yourself at the recommended distance from your screen</li>
                    <li>Cover one eye at a time when instructed</li>
                    <li>Identify the letters displayed on the screen</li>
                    <li>Continue until you can no longer identify the letters accurately</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Understanding Your Results:</h3>
                  <p>
                    Results are typically shown as a fraction (e.g., 20/20). The first number represents your distance from the screen, 
                    and the second number represents the distance at which a person with normal vision could read the same line.
                    A score of 20/20 indicates normal vision, while 20/40 means you need to be at 20 feet to see what someone with 
                    normal vision can see at 40 feet.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Vision Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Color Vision Test helps identify potential color vision deficiencies, commonly known as color blindness, 
                    using Ishihara-inspired color plates.
                  </p>
                  
                  <h3 className="font-semibold mt-4">How to Take the Test:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Look at each colored plate carefully</li>
                    <li>Identify the number or pattern visible within the colored dots</li>
                    <li>Input your answer</li>
                    <li>Proceed through all test plates</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Understanding Your Results:</h3>
                  <p>
                    Results are presented as a percentage of correct answers. A score of 80% or higher typically indicates normal 
                    color vision, while lower scores may suggest some degree of color vision deficiency. The most common types are 
                    red-green color deficiency (deuteranomaly/protanomaly) and blue-yellow color deficiency (tritanomaly).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Astigmatism Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Astigmatism Test helps detect potential irregularities in your cornea or lens that may cause blurred vision.
                  </p>
                  
                  <h3 className="font-semibold mt-4">How to Take the Test:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Look at the starburst pattern shown on screen</li>
                    <li>Note if some lines appear darker, blurrier, or more distinct than others</li>
                    <li>Follow the instructions to report which lines appear clearer or more distorted</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Understanding Your Results:</h3>
                  <p>
                    If you notice that lines in certain directions appear more distinct or blurred than others, this may indicate 
                    astigmatism. Results will suggest whether you might have astigmatism and recommend appropriate follow-up with an 
                    eye care professional.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contrast Sensitivity Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Contrast Sensitivity Test measures your ability to distinguish objects from their background at varying levels of contrast.
                  </p>
                  
                  <h3 className="font-semibold mt-4">How to Take the Test:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Position yourself at the recommended distance from your screen</li>
                    <li>Identify letters of decreasing contrast against the background</li>
                    <li>Enter the letter you see or your best guess</li>
                    <li>Continue until you complete all test patterns</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Understanding Your Results:</h3>
                  <p>
                    Your contrast sensitivity score indicates how well you can detect subtle differences in contrast. Reduced contrast sensitivity 
                    can make it difficult to see in low light conditions or foggy environments, even if your visual acuity is normal. If your score 
                    suggests reduced contrast sensitivity, a follow-up with an eye care professional is recommended.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">What to Do After Your Test</h2>
              <p className="max-w-3xl mx-auto">
                Your test results will provide a preliminary assessment of your visual health. Based on these results, you may be 
                advised to consult with an eye care professional for a comprehensive examination. Remember that these online tests 
                are screening tools and not definitive diagnostic tests. Regular eye examinations by qualified professionals are 
                essential for maintaining good eye health.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;
