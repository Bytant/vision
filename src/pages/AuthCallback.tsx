
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle the OAuth or email confirmation callback
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error during auth callback:', error);
          setError('Authentication failed. Please try again.');
          setTimeout(() => navigate('/signin'), 2000);
          return;
        }

        if (data.session) {
          // Get the intended destination or default to home page
          const from = location.state?.from?.pathname || '/';
          
          // Navigate to intended destination
          navigate(from, { replace: true });
        } else {
          // No session, redirect to sign in after a short delay
          setTimeout(() => navigate('/signin'), 1000);
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        setError('An unexpected error occurred. Please try again.');
        setTimeout(() => navigate('/signin'), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        {error ? (
          <h1 className="text-2xl font-bold mb-4 text-red-500">{error}</h1>
        ) : (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4 mx-auto" />
            <h1 className="text-2xl font-bold mb-4">Completing authentication...</h1>
            <p>Please wait while we confirm your identity.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
