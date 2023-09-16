import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Song } from '../types';
import { cookies } from 'next/headers';
import getSongs from './getSongs';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    };

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', { ascending: false });
    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByTitle;