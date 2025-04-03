import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type CardItemProps = {
    name: string;
    avatar_id: string;
    voice_id: string;
    imageUrl: string;
    videoUrl: string;
};

const cardItems: CardItemProps[] = [
    {
        name: "Gala",
        avatar_id: "Gala_sitting_casualsofawithipad_front",
        voice_id: "35b75145af9041b298c720f23375f578",
        imageUrl:
            "https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_target.webp",
        videoUrl:
            "https://files2.heygen.ai/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_video_target.mp4",
    },
    {
        name: "Conrad",
        avatar_id: "Conrad_sitting_sofa_front",
        voice_id: "5403a745860347beb7d342e07eef33fb",
        imageUrl:
            "https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/c93e6cf24e9c4fd9b65fffeb676e43d7_37240/preview_target.webp",
        videoUrl:
            "https://files2.heygen.ai/avatar/v3/c93e6cf24e9c4fd9b65fffeb676e43d7_37240/preview_video_target.mp4",
    },
    {
        name: "Jocelyn",
        avatar_id: "Jocelyn_sitting_sofa_front",
        voice_id: "7194df66c861492fb6cc379e99905e22",
        imageUrl:
            "https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/3019184debd34a2e8206c441cad2289d_36670/preview_target.webp",
        videoUrl:
            "https://files2.heygen.ai/avatar/v3/3019184debd34a2e8206c441cad2289d_36670/preview_video_target.mp4",
    },
];

const generateVoice = async ({ avatar_id, voice_id, script }) => {
    try {
        const { error } = await supabase.functions.invoke("create-video", {
            body: JSON.stringify({
                avatar_id,
                voice_id,
                script: script,
            }),
        });

        if (error) throw error;

        window.location.reload();
    } catch (err) {
        alert(err);
    }
};

const CardGrid = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<CardItemProps | null>(
        null
    );
    const [script, setScript] = useState("");

    const videoMutation = useMutation({
        mutationFn: (data: {
            avatar_id: string;
            voice_id: string;
            script: string;
        }) =>
            generateVoice({
                avatar_id: data.avatar_id,
                voice_id: data.voice_id,
                script: data.script,
            }),
    });

    const handleAvatarClick = (item: CardItemProps) => {
        setSelectedAvatar(item);
        setIsModalOpen(true);
    };

    const handleGenerateClick = () => {
        videoMutation.mutate({
            avatar_id: selectedAvatar.avatar_id,
            voice_id: selectedAvatar.voice_id,
            script: script,
        });
    };

    return (
        <div className="space-y-4 w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Select an Avatar
            </h2>
            {/* Single row - 3 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cardItems.map((item, index) => (
                    <AvatarCard
                        key={index}
                        item={item}
                        onClick={() => handleAvatarClick(item)}
                    />
                ))}
            </div>

            {/* Avatar video modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            {selectedAvatar?.name}
                        </DialogTitle>
                        {/* <Button
                            variant="ghost"
                            className="absolute right-4 top-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button> */}
                    </DialogHeader>
                    {selectedAvatar && (
                        <div className="relative w-full pt-[56.25%]">
                            <video
                                className="absolute inset-0 w-full h-full object-cover rounded-md"
                                src={selectedAvatar.videoUrl}
                                autoPlay
                                controls
                            />
                        </div>
                    )}

                    {/* Script input and Generate button */}
                    <div className="mt-4 space-y-4">
                        <Textarea
                            placeholder="Type your script"
                            className="w-full min-h-[100px]"
                            value={script}
                            onChange={(e) => setScript(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleGenerateClick}>
                                Generate
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

type AvatarCardProps = {
    item: CardItemProps;
    onClick: () => void;
};

const AvatarCard = ({ item, onClick }: AvatarCardProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Card
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <CardContent className="p-0">
                <div
                    className="aspect-square w-full relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {isHovering ? (
                        <video
                            src={item.videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover absolute inset-0 z-10"
                        />
                    ) : (
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="p-4 flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={item.imageUrl} alt={item.name} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{item.name}</h3>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardGrid;
