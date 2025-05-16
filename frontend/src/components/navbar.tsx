import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("X");
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

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
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true });
      setAuth(false);
      navigate("/signin");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <nav className="max-h-15 w-full">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-wide flex items-center gap-2 cursor-pointer"
        onClick={()=> navigate('/')}>
          <span className="w-8">
            <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_425ddb607e85f91b24ff371f81faab44/qrfy.png" alt="Logo" />
          </span>
          <span className="text-blue-600 text-xl">openQR</span>
        </div>

        <div className="relative">
          <div className="flex gap-4 items-center hover:bg-blue-50 transition ease-out px-4 py-1 rounded-lg"
          onClick={() => setOpen(!open)}>

          <button className="bg-blue-600 text-xs  w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-semibold"
            >
            {username[0]?.toUpperCase() || "?"}
          </button>
            <span className="font-semibold">{username}</span>
            </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50">
              <div className="px-3 py-2 border-b border-gray-700">
                <span className="font-medium">{username}</span>
              </div>
              <ul className="mt-1">
                <li
                  className="px-3 py-2 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    navigate(auth ? "/dashboard" : "/signup");
                  }}
                >
                  My Links
                </li>
                <li
                  className="px-3 py-2 hover:bg-red-400 rounded cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
