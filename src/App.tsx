
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RouteGuard from "./components/auth/RouteGuard";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tests from "./pages/Tests";
import VisualAcuityTest from "./pages/VisualAcuityTest";
import ColorVisionTest from "./pages/ColorVisionTest";
import AstigmatismTest from "./pages/AstigmatismTest";
import ContrastSensitivityTest from "./pages/ContrastSensitivityTest";
import CataractTest from "./pages/CataractTest";
import TestResults from "./pages/TestResults";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LearnMore from "./pages/LearnMore";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient();

const AppWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public routes that don't require authentication */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Protected routes that require authentication */}
        <Route path="/tests" element={
          <RouteGuard>
            <Tests />
          </RouteGuard>
        } />
        <Route path="/tests/visual-acuity" element={
          <RouteGuard>
            <VisualAcuityTest />
          </RouteGuard>
        } />
        <Route path="/tests/color-vision" element={
          <RouteGuard>
            <ColorVisionTest />
          </RouteGuard>
        } />
        <Route path="/tests/astigmatism" element={
          <RouteGuard>
            <AstigmatismTest />
          </RouteGuard>
        } />
        <Route path="/tests/contrast-sensitivity" element={
          <RouteGuard>
            <ContrastSensitivityTest />
          </RouteGuard>
        } />
        <Route path="/cataract-test" element={
          <RouteGuard>
            <CataractTest />
          </RouteGuard>
        } />
        <Route path="/tests/cataract" element={
          <RouteGuard>
            <CataractTest />
          </RouteGuard>
        } />
        <Route path="/test-results" element={
          <RouteGuard>
            <TestResults />
          </RouteGuard>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWithProviders />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
