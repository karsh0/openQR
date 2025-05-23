import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";

export function Navbar({auth, setAuth}:{auth:boolean, setAuth:(x:boolean)=>void }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("X");
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${BACKEND_URL}/user`, { withCredentials: true });
        setUsername(res.data.username);
        setAuth(true);
      } catch (err) {
        console.error("User fetch failed", err);
        setAuth(false);
      }
    }
    fetchUser();
  }, [auth]);

  // Close popup if click is outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });
      setUsername('X');
      setAuth(false);
      navigate("/signin");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <nav className="max-h-15 w-full">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div
          className="text-xl font-semibold tracking-wide flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="w-8">
            <img
              src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_425ddb607e85f91b24ff371f81faab44/qrfy.png"
              alt="Logo"
            />
          </span>
          <span className="text-blue-600 text-xl">openQR</span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex gap-4 items-center hover:bg-blue-50 transition ease-out px-4 py-1 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            <button className="bg-blue-600 text-xs w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-semibold">
              {username[0]?.toUpperCase() || "?"}
            </button>
            <span className="font-semibold">{username}</span>
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-lg p-2 z-50">
              <div className="flex gap-4 items-center px-3 py-2 border-b border-gray-500">
                <button className="bg-blue-600 text-xs w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-semibold">
                  {username[0]?.toUpperCase() || "?"}
                </button>
                <span className="font-medium">{username}</span>
              </div>
              <ul className="mt-1">
                <li
                  className="px-3 py-2 hover:bg-blue-500 rounded cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    navigate(auth ? "/dashboard" : "/signup");
                  }}
                >
                  My Links
                </li>
               {auth ? <li
                  className="px-3 py-2 hover:bg-red-400 rounded cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </li> : 
                <li
                  className="px-3 py-2 hover:bg-red-400 rounded cursor-pointer"
                  onClick={() => {
                    navigate('/signup')
                  }}
                >
                  Signup
                </li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
