"use client";

import { Song } from '@/types';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';
import useAuthModal from '@/hooks/useAuthModal';

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const router = useRouter();
    const authModal = useAuthModal();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
            authModal.onOpen();
        }
    }, [isLoading, user, router, authModal]);

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                Like something!
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem onClick={(id) => onPlay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default LikedContent;