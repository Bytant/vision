
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If auth is still loading, show nothing or loading indicator
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // If user is not authenticated, redirect to sign in
  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this feature",
      variant: "destructive",
    });
    
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the protected route
  return <>{children}</>;
};

export default RouteGuard;
