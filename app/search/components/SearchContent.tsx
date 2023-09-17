"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types"
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found.
            </div>
        )
    }

    const onPlay = useOnPlay(songs);

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => {
                return <div className='flex items-center-gap-x-4 w-full' key={song.id}>
                    <div className="flex-1">
                        <MediaItem onClick={(id) => onPlay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            })}
        </div>
    );
};

export default SearchContent;