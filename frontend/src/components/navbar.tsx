import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [username, setUsername] = useState('X');

    useEffect(()=>{
      async function fetch(){
        const res = await axios.get(`${BACKEND_URL}/user`, {withCredentials: true})
        setUsername(res.data.username)
      }
      fetch()
    },[])

    return (
    <nav className="bg-[#0d0d0d] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-wide flex items-center gap-2">
          <span className="w-10 "><img src="https://qrcode-online.com/icon.png" alt="" /></span>
          <span className="text-green-500 text-2xl">openQR</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold hover:bg-gray-700 transition"
          >
            {username[0]}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50">
              <div className="px-3 py-2 border-b border-gray-700">
                <span className="font-medium">{username}</span>
              </div>
              <ul className="mt-1">
                <li className="px-3 py-2 hover:bg-gray-700 rounded cursor-pointer" onClick={()=>{
                    navigate('/dashboard') 
                    setOpen(!open)}}>
                My Links</li>
                <li className="px-3 py-2 hover:bg-red-400 rounded cursor-pointer" onClick={()=>
                    setOpen(!open)
                }>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
