"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import qs from "query-string";
import Input from "./Input";

interface Props { }

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue
        };

        const url = qs.stringifyUrl({
            url: "/search",
            query
        });

        router.push(url);
    }, [debouncedValue]);

    return (
        <div>
            <Input placeholder="What do you want to listen to?" value={value} onChange={(e) => { setValue(e.target.value) }}></Input>
        </div>
    );
};

export default SearchInput;