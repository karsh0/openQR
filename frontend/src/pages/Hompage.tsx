import { useRef } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export default function Homepage(){
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement | null>(null)
    return <div>
        Homepage
       <div className="flex gap-2">
            <Input placeholder="Paste your long URL here" ref={inputRef}/>
            <Button title="Generate QR" onClick={()=> navigate(`/dashboard?create=${inputRef.current?.value}`)}/>
       </div>
    </div>
}