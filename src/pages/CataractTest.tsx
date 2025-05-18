
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Camera, ImageIcon, Loader2, Eye, CheckCircle, XCircle } from "lucide-react";

const CataractTest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<'positive' | 'negative' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [imageData, setImageData] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        setCameraActive(false);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      console.log("Attempting to start camera...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      console.log("Camera access granted, stream:", stream);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Add event listener to know when video is ready
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                console.log("Video playback started");
                setCameraActive(true);
              })
              .catch(err => {
                console.error("Error playing video:", err);
                toast({
                  variant: "destructive",
                  title: "Camera error",
                  description: "There was an error starting the camera stream."
                });
              });
          }
        };
      }
      
      setStep(1);
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please allow camera access to perform the cataract screening test."
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      console.log("Capturing image. Video dimensions:", video.videoWidth, video.videoHeight);
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      // Draw current video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        console.log("Drawing video to canvas");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        console.log("Image captured, data URL length:", imageDataUrl.length);
        setImageData(imageDataUrl);
        
        // Stop camera stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          setCameraActive(false);
        }
        
        setStep(2);
      }
    } else {
      console.error("Video or canvas ref is null", { video: videoRef.current, canvas: canvasRef.current });
      toast({
        variant: "destructive",
        title: "Capture failed",
        description: "Could not capture image. Please try again."
      });
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    
    // Simulate CNN analysis with a timeout
    // In a real app, you would send the image to your backend for analysis
    setTimeout(() => {
      // Generate a random result for demo purposes
      // In reality, this would be the result from your CNN model
      const isCataract = Math.random() > 0.5;
      setResult(isCataract ? 'positive' : 'negative');
      
      // Random confidence between 75% and 98%
      const randomConfidence = 75 + Math.random() * 23;
      setConfidence(parseFloat(randomConfidence.toFixed(1)));
      
      setAnalyzing(false);
      setStep(3);
    }, 3000);
  };

  const retakePhoto = () => {
    setImageData(null);
    startCamera();
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Cataract Screening Test</CardTitle>
              <CardDescription>
                This test uses computer vision to screen for signs of cataracts in your eyes.
                Please follow the instructions carefully to get accurate results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Find a well-lit room with no direct glare or reflections</li>
                  <li>Position your face 12-18 inches from the camera</li>
                  <li>Remove glasses if you wear them</li>
                  <li>Keep your eyes open wide when taking the photo</li>
                  <li>Your privacy is important - images are analyzed locally and not stored</li>
                </ul>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 mt-4"
                onClick={startCamera}
              >
                <Camera className="mr-2 h-4 w-4" /> Start Camera
              </Button>
            </CardContent>
          </Card>
        );
        
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Position Your Eyes</CardTitle>
              <CardDescription>
                Center your face in the frame and look directly at the camera.
                Make sure your eyes are clearly visible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 items-center flex flex-col">
              <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover"
                  autoPlay 
                  playsInline
                  muted
                />
                
                {/* Hidden canvas for capturing the image */}
                <canvas ref={canvasRef} className="hidden" />
                
                <div className="absolute inset-0 border-2 border-dashed border-white/70 m-8 rounded-lg pointer-events-none"></div>
                
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p>Starting camera...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (streamRef.current) {
                      streamRef.current.getTracks().forEach(track => track.stop());
                      setCameraActive(false);
                    }
                    setStep(0);
                  }}
                >
                  Back
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={captureImage}
                  disabled={!cameraActive}
                >
                  Capture Image
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Confirm Image</CardTitle>
              <CardDescription>
                Is your face clearly visible and well-lit? Your eyes should be clearly visible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 items-center flex flex-col">
              {imageData && (
                <div className="w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
                  <img 
                    src={imageData} 
                    alt="Captured eye" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              <div className="flex gap-3 mt-4">
                <Button 
                  variant="outline" 
                  onClick={retakePhoto}
                >
                  Retake Photo
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={analyzeImage}
                >
                  Analyze Image
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">
                {analyzing ? "Analyzing Your Image" : "Cataract Screening Results"}
              </CardTitle>
              <CardDescription>
                {analyzing 
                  ? "Our AI is analyzing your eye image for signs of cataracts..." 
                  : "Here are the preliminary results of your cataract screening."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyzing ? (
                <div className="py-8 flex flex-col items-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-neutral text-center">Analyzing image with CNN model...</p>
                  <Progress value={45} className="w-full max-w-xs mt-4" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg flex items-center gap-4 ${
                    result === 'positive' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                  }`}>
                    {result === 'positive' ? (
                      <>
                        <XCircle className="h-8 w-8 text-red-500" />
                        <div>
                          <h3 className="font-semibold text-lg">Potential Signs of Cataracts Detected</h3>
                          <p className="text-sm opacity-80">
                            Our system detected potential signs of cataracts in your image.
                            This is not a diagnosis, and you should consult an eye specialist.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <div>
                          <h3 className="font-semibold text-lg">No Clear Signs of Cataracts</h3>
                          <p className="text-sm opacity-80">
                            Our system did not detect clear signs of cataracts in your image.
                            Regular eye check-ups are still recommended.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Analysis Confidence</p>
                      <p className="text-sm font-semibold">{confidence}%</p>
                    </div>
                    <Progress value={confidence} className="w-full" />
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                    <h3 className="font-medium text-lg mb-2">Important Note:</h3>
                    <p className="text-sm">
                      This screening test is not a medical diagnosis. It's designed to help identify 
                      potential signs that may warrant professional attention. For a proper diagnosis, 
                      please consult with an ophthalmologist or eye care professional.
                    </p>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={retakePhoto}
                      className="flex-1"
                    >
                      Retake Test
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 flex-1"
                      onClick={() => navigate('/tests')}
                    >
                      Finish
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          {renderStepContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CataractTest;
