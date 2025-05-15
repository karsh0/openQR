import { useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/signin`, { username, password },{ withCredentials: true});
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin error:", err);
    }
  };

  return (
    <div className="bg-[#0d0d0d] text-white h-screen flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold">Sign In</h2>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button title="Sign In" onClick={handleSignin} dark />
        <p className="text-center text-sm">
          Don’t have an account? <span className="text-purple-600 hover:underline cursor-pointer" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
