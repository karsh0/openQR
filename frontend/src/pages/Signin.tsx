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
      const res = await axios.post(
        `${BACKEND_URL}/signin`,
        { username, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6 md:p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl bg-white rounded-3xl overflow-hidden">
        
        <div className="w-full md:w-1/2 p-6 md:p-16">
          <div className="mb-6">
            <img
              src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_425ddb607e85f91b24ff371f81faab44/qrfy.png"
              alt="Logo"
              className="h-8"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm md:text-lg text-gray-500 mb-6">Enter your credentials to sign in</p>

          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right mt-2 mb-6">
            <span className="text-blue-600 text-sm cursor-pointer underline">Forgot password?</span>
          </div>

          <Button title="Sign In" dark onClick={handleSignin} />

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10 relative">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold mb-4">The simplest way to manage your links</h3>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-payment-illustration-download-in-svg-png-gif-file-formats--barcode-scanner-scanning-app-code-money-transfer-qr-for-online-pack-science-technology-illustrations-3749042.png"
              alt="Signin illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
