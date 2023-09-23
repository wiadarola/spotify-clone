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

    const { data: { session } } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .or(`${session?.user ? `user_id.eq.${session?.user.id},` : ``}user_id.eq.2539117e-eda2-4206-8408-9e21825635b1,user_id.eq.973ab12e-a45b-4d95-a552-3a0c75c91744`)
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });
    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByTitle;