import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CardGrid from "@/components/CardGrid";
import GeneratedVideos from "@/components/GeneratedVideos";

const Index = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <Navbar />
            <div className="flex-1 my-10 gap-y-10 flex-col flex items-center justify-center pt-16 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl w-full max-w-6xl"
                >
                    <CardGrid />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl w-full max-w-6xl"
                >
                    <GeneratedVideos />
                </motion.div>
            </div>
        </div>
    );
};

export default Index;
