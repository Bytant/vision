import { useEffect } from "react";
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

  useEffect(() => {
    console.log("RouteGuard rendered with:", { 
      isAuthenticated: !!user, 
      isLoading, 
      currentPath: location.pathname 
    });
  }, [user, isLoading, location.pathname]);

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/signin", 
    "/signup", 
    "/auth/callback", 
    "/learn-more",
    "/about"
  ];

  // If auth is still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-neutral">Loading your session...</p>
      </div>
    );
  }

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // If user is not authenticated and trying to access a protected route
  if (!user && !isPublicRoute) {
    console.log("Not authenticated, redirecting to signin from:", location.pathname);
    
    toast({
      title: "Authentication required",
      description: "Please sign in to access this feature",
      variant: "destructive",
    });
    
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access signin/signup, redirect to home
  if (user && (location.pathname === "/signin" || location.pathname === "/signup")) {
    console.log("Already authenticated, redirecting to home from:", location.pathname);
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the requested route
  return <>{children}</>;
};

export default RouteGuard;
