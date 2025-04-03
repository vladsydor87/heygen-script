import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthLayoutProps {
    children: ReactNode;
    requireAuth?: boolean;
}

export function AuthLayout({ children, requireAuth = false }: AuthLayoutProps) {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set up auth state listener FIRST
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);

            // Redirect authenticated users away from auth page
            if (session && window.location.pathname === "/auth") {
                navigate("/");
            }

            // Redirect unauthenticated users to auth page if auth is required
            if (!session && requireAuth) {
                navigate("/auth");
            }
        });

        // THEN check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);

            // Initial redirect logic
            if (session && window.location.pathname === "/auth") {
                navigate("/");
            }

            if (!session && requireAuth) {
                navigate("/auth");
            }

            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [navigate, requireAuth]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If auth is required and we don't have a session, don't render children
    // The navigate effect will redirect to auth page
    if (requireAuth && !session) {
        return null;
    }

    return <>{children}</>;
}
