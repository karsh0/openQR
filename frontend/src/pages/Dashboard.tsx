import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Popup } from "../components/popup";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { Card } from "../components/card";
import { motion } from "framer-motion";

type CardType = {
  link: string,
  title: string,
  timestamp: string
}

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<CardType[] | []>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${BACKEND_URL}/generate`, { withCredentials: true });
        setData(res.data.card);
        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [toggle]);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-[#0d0d0d] text-white p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="max-w-69">
          <Button title="Create New Link" onClick={() => setToggle(!toggle)} dark={false} />
          </div>
        </div>

        {loading ? 'loading...' : 
        <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Your QR Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.map((x, i) => (
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
            <Card key={i} url={x.link} title={x.title} timestamp={x.timestamp} />
            </motion.div>
          ))}
        </div>
      </div>
      }

      </div>
      {toggle && <Popup setToggle={setToggle} />}
    </div>
  );
}
