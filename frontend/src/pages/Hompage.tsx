import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleGenerate = () => {
    const value = inputRef.current?.value?.trim();
    if (value) navigate(`/dashboard?create=${(value)}`);
  };

  return (
    <div className="min-h-screen w-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl text-center space-y-4 mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Make your links <span className="text-gray-400">stand out</span>
        </h1>
        <p className="text-gray-400 text-xl">
          Transform long, complex URLs into simple, memorable QR codes for easy sharing and tracking.
        </p>
      </div>

      <div className="flex w-full max-w-xl items-center bg-[#1a1a1a] p-2 md:px-4 md:py-2 rounded-xl shadow-md mb-5 md:mb-16">
        <input
          ref={inputRef}
          placeholder="Paste your long URL here..."
          className="flex-1 mr-2 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none"
        />
       <div className="max-w-96 text-sm md:text:lg"> <Button title="Generate QR" onClick={handleGenerate} dark={false} /></div>
      </div>

      <div className="mt-20 max-w-7xl w-full">
        <h2 className="text-center text-3xl font-semibold mb-6">Why choose this platform?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
              {
                title: "Fast Creation",
                desc: "Shorten links and generate QR codes instantly.",
                icon: "⚡️",
              },
              {
                title: "Real-Time Analytics",
                desc: "Track clicks, devices, and locations live.",
                icon: "📊",
              },
              {
                title: "Secure Links",
                desc: "Your data stays encrypted and private.",
                icon: "🔒",
              },
              {
                title: "Custom Domains",
                desc: "Use branded URLs with custom aliases.",
                icon: "✨",
              },
              {
                title: "Auto QR Codes",
                desc: "Every short link gets a clean QR code.",
                icon: "🔲",
              },
              {
                title: "Team Access",
                desc: "Work together with shared link control.",
                icon: "👥",
              },
              {
                title: "Developer API",
                desc: "Integrate links into your own tools.",
                icon: "</>",
              },
              {
                title: "Brand Styling",
                desc: "Add your logo and brand colors easily.",
                icon: "⭐",
              }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#1c1c1c] rounded-xl p-7 text-center shadow-sm hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-1">{feature.title}</h3>
              <p className="text-md text-gray-400">{feature.desc}</p>
            </motion.div>
                  ))}
                </div>
              </div>
            </div>
  );
}
