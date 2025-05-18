
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If auth is still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-neutral">Loading your session...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to sign in with current location
  if (!user) {
    // Only show toast if user is trying to access a protected route (not on initial load)
    if (location.pathname !== "/" && 
        location.pathname !== "/signin" && 
        location.pathname !== "/signup" && 
        location.pathname !== "/auth/callback" &&
        location.pathname !== "/learn-more" &&
        location.pathname !== "/about") {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
    }
    
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the protected route
  return <>{children}</>;
};

export default RouteGuard;
