import { useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${BACKEND_URL}/signup`, { username, password });
      navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold">Sign Up</h2>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button title="Sign Up" onClick={handleSignup} dark />
        <p className="text-center text-sm">
          Already have an account? <span className="text-purple-600 hover:underline cursor-pointer" onClick={() => navigate("/signin")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
