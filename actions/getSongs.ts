import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Song } from '../types';
import { cookies } from 'next/headers';

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data: { session } } = await supabase.auth.getSession();

    const or = `${session?.user ? `user_id.eq.${session?.user.id},` : ``}user_id.eq.2539117e-eda2-4206-8408-9e21825635b1,user_id.eq.973ab12e-a45b-4d95-a552-3a0c75c91744`;

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .or(or)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
};

export default getSongs;