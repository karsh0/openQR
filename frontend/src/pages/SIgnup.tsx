import { useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${BACKEND_URL}/signup`, { username: name, email, password });
      navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6 md:p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl bg-white rounded-3xl overflow-hidden">
        
        <div className="w-full md:w-1/2 p-6 md:p-16">
          <div className="mb-6">
            <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_425ddb607e85f91b24ff371f81faab44/qrfy.png" alt="Logo" className="h-8" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Get Started Now</h2>
          <p className="text-sm md:text-lg text-gray-500 mb-6">Enter your credentials to access your account</p>
          
          {/* <img src="https://cdn.document360.io/b5cf4edd-8d9e-4649-a50a-2d7591eba26b/Images/Documentation/CleanShot_2023-11-06_at_10.32.52_2x-removebg-preview.png" alt="Google" className="w-70" />

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-400">or</span>
            </div>
          </div> */}

          <div className="space-y-4">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="flex items-center mt-4 mb-6">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I agree to the <span className="text-blue-600 underline cursor-pointer">Terms & Privacy</span>
            </label>
          </div>

          <Button title="Signup" dark onClick={handleSignup} />

          <p className="mt-6 text-sm text-gray-600 text-center">
            Have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10 relative">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold mb-4">The simplest way to manage your links</h3>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-payment-illustration-download-in-svg-png-gif-file-formats--barcode-scanner-scanning-app-code-money-transfer-qr-for-online-pack-science-technology-illustrations-3749042.png" alt="Dashboard preview"  />
          </div>
        </div>
      </div>
    </div>
  );
}
