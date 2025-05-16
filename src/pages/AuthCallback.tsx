
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle the OAuth or email confirmation callback
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        navigate('/signin?error=auth-callback-failed');
      } else if (data.session) {
        // Get the intended destination or default to home page
        const from = location.state?.from?.pathname || '/';
        
        // Successfully authenticated, redirect to intended destination
        navigate(from, { replace: true });
      } else {
        // No session, redirect to sign in
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing authentication...</h1>
        <p>Please wait while we confirm your identity.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
