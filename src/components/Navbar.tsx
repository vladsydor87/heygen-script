import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Navbar() {
    const [session, setSession] = useState<Session | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            toast({
                title: "Signed out successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error signing out",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-bold text-purple-600"
                        >
                            HeyGen Avatar Script Generator
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {session ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700">
                                    {session.user.email}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Link to="/auth">
                                <Button variant="default">Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
