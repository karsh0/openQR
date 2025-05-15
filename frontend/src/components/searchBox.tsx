import { useRef } from "react";
import { Input } from "./input";

export function SearchBox({setTitle}:{setTitle: (value: string | undefined)=>void}) {
    const searchRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className="w-50 md:w-96 flex gap-2">
            <Input placeholder="search title..." ref={searchRef} onChange={()=> setTitle(searchRef.current?.value)} />
        </div>
    );
}
