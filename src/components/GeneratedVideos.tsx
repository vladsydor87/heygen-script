import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

const getVideos = async () => {
    try {
        // @ts-ignore
        const { data, error } = await supabase.from("video").select();

        if (error) throw error;

        return data;
    } catch (err) {
        alert(err);
    }
};

const GeneratedVideos = () => {
    const videoQuery = useQuery({
        queryKey: ["videos"],
        queryFn: () => getVideos(),
    });

    return (
        <div className="space-y-4 w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Your videos
            </h2>
            {videoQuery.isLoading ? (
                <div className="flex items-center justify-center">
                    <p className="text-white/60">Loading</p>
                </div>
            ) : videoQuery.isError ? (
                <div className="flex items-center justify-center">
                    <p className="text-white/60">Error happened</p>
                </div>
            ) : (
                <>
                    {videoQuery.data.length === 0 ? (
                        <div className="flex items-center justify-center">
                            <p className="text-white/60">
                                Choose an avatar to generate a video
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 auto-rows-[200px] gap-4">
                            {videoQuery.data.map(
                                (
                                    item: {
                                        status: string;
                                        video_url: string;
                                    },
                                    index
                                ) => (
                                    <Fragment key={index}>
                                        {item.status === "processing" ? (
                                            <div className="rounded w-full h-full bg-white/50 animate-pulse flex items-center justify-center">
                                                <p className="text-black/60">
                                                    Video is generating
                                                </p>
                                            </div>
                                        ) : item.status === "completed" ? (
                                            <div className="relative flex items-center justify-center w-full h-full">
                                                <video
                                                    src={item.video_url || ""}
                                                    className="rounded w-full"
                                                    controls
                                                ></video>
                                            </div>
                                        ) : null}
                                    </Fragment>
                                )
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GeneratedVideos;
