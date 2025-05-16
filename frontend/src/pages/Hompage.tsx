import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import { AboutArray } from "../config/data";

export default function Homepage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleGenerate = () => {
    const value = inputRef.current?.value?.trim();
    if (value) navigate(`/dashboard?create=${(value)}`);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center px-5 py-16 md:px-50 md:py-8 mt-8">
      <div className="max-w-3xl text-center space-y-4 mb-10">
        <button className="text-blue-600 bg-blue-100 rounded-lg p-2 md:px-3 md:py-2 cursor-pointer hover:shadow hover:bg-blue-200 transition font-semibold text-xs">Welcome to openQR</button>
        <h1 className="text-4xl sm:text-6xl font-bold">
          Make your links <span className="text-blue-600">stand out</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-xl">
        Easily transform long, cluttered URLs into clean, memorable QR codes that are perfect for sharing across digital and print platforms.
        </p>
      </div>

      <div className="flex w-full max-w-xl items-center p-2 md:px-4 md:py-2 rounded-xl shadow-md mb-5 md:mb-16">
        <input
          ref={inputRef}
          placeholder="Paste your long URL here..."
          className="flex-1 text-sm mr-2 bg-transparent border-none text-black placeholder-gray-500 focus:outline-none"
        />
       <div className="max-w-96 text-sm md:text:lg"> <Button title="Generate QR"  onClick={handleGenerate} dark={true} /></div>
      </div>

      <div className="mt-20 w-full text-center">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">How <span className="text-blue-600">openQR</span> AI Works
        </h2>
        <p className="text-gray-600 text-sm md:text-lg mb-14">Our platform is designed to simplify link management.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {AboutArray.map((feature, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col gap-5 rounded-xl p-10 pt-10 mb-10 md:mb-2 md:pt-20 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-4xl bg-blue-600 p-4 md:p-6 rounded-full text-white shadow absolute top-[-30px] left-1/2 transform -translate-x-1/2">{feature.icon}</div>
              <h3 className="text-xl text-blue-600 font-bold mb-1">{feature.title}</h3>
              <p className="text-sm md:text-lg  text-gray-600">{feature.desc}</p>
            </motion.div>
                  ))}
                </div>
              </div>
            </div>
  );
}
