
"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModel = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
        if (!user?.id) return authModel.onOpen();

        if (isLiked) {
            const { error } = await supabaseClient.from("liked_songs").delete().eq("user_id", user.id).eq("song_id", songId);
            if (error) toast.error(error.message);
            setIsLiked(false);
        } else {
            const { error } = await supabaseClient.from("liked_songs").insert({ user_id: user.id, song_id: songId });
            if (error) toast.error(error.message);
            setIsLiked(true);
        }
        router.refresh();
    }

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            const { data, error } = await supabaseClient.from("liked_songs").select("*").eq("user_id", user.id).eq("song_id", songId).single();
            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [user?.id, songId, supabaseClient]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <button className="hover:opacity-75 transition" onClick={handleLike}>
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    );
};

export default LikeButton;