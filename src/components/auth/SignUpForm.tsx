
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Check if username exists
  const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .limit(1);
      
      if (error) {
        console.error("Error checking username:", error);
        return false;
      }
      
      return data && data.length > 0;
    } catch (error) {
      console.error("Exception checking username:", error);
      return false;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setNetworkError(false);
    setUsernameExists(false);
    
    try {
      console.log("Checking if username exists:", values.username);
      
      // First check if username already exists
      const exists = await checkUsernameExists(values.username);
      
      if (exists) {
        setUsernameExists(true);
        setIsLoading(false);
        return;
      }
      
      console.log("Username is available, attempting to sign up with:", { email: values.email, username: values.username });
      
      // Check if Supabase is properly initialized
      if (!supabase.auth) {
        throw new Error("Supabase client is not properly initialized");
      }

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            username: values.username,
          },
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          toast({
            variant: "destructive",
            title: "Email already registered",
            description: "This email address is already in use. Please try signing in instead.",
          });
        } else {
          throw error;
        }
      } else {
        console.log("Sign up response:", data);
        
        toast({
          title: "Verification email sent",
          description: "Please check your email to verify your account.",
        });
        
        // Redirect to sign in after successful sign up
        navigate("/signin");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      
      // Check if it's a network error
      if (error.message === "Failed to fetch" || error.code === "NETWORK_ERROR") {
        setNetworkError(true);
      } else {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error?.message || "There was a problem with your request.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-dark">Create an Account</h2>
        <p className="text-sm text-neutral mt-2">
          Sign up to track your vision test results
        </p>
      </div>
      
      {networkError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to the authentication service. Please ensure you have configured your Supabase credentials correctly.
          </AlertDescription>
        </Alert>
      )}
      
      {usernameExists && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Username Already Taken</AlertTitle>
          <AlertDescription>
            This username is already in use. Please choose a different username.
          </AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="johndoe" 
                    {...field} 
                    disabled={isLoading}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsernameExists(false); // Reset the error when user types
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com" 
                    {...field} 
                    disabled={isLoading}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="******" 
                    type="password" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="******" 
                    type="password" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        <p className="text-neutral">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
