import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import { createContext } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const userContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const { } = useSessionContext();
};