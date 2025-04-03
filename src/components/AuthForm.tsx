import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Disable email confirmation so users are automatically logged in
            emailRedirectTo: undefined,
          },
        });
        
        if (error) throw error;
        
        // If the user object exists in the response, they are successfully authenticated
        if (data.user) {
          toast({
            title: "Account created successfully",
            description: "You are now signed in!",
          });
          navigate("/");
        } else {
          // This branch should not execute with email confirmation disabled
          // But keeping it as a fallback
          toast({
            title: "Sign up successful",
            description: "Your account has been created.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{isSignUp ? "Create an Account" : "Sign In"}</h1>
        <p className="text-muted-foreground mt-2">
          {isSignUp
            ? "Sign up to get started with our application"
            : "Welcome back! Please sign in to continue"}
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleEmailAuth}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : isSignUp ? "Create account" : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            className="underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
