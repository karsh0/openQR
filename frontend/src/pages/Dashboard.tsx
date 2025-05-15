import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Popup } from "../components/popup";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/searchBox";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CardType = {
  link: string,
  title: string,
  timestamp: string
};

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const value = searchParams.get('create');

  useEffect(() => {
    if (value) {
      setToggle(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/generate`, { withCredentials: true });
        setData(res.data.card);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetch]);
  
  const filteredArray =
  title?.trim() && title.length > 0
    ? data.filter((x) => x.title.toLowerCase().includes(title.toLowerCase()))
    : data;

  return (
    <div className="flex flex-col min-h-screen w-screen bg-[#0d0d0d] text-white p-6 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-bold">Dashboard</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between border-b border-white/10 pb-2">
        <h2 className="text-xl font-semibold ">Your QR Collections</h2>
          <div className="flex gap-2 h-9 md:h-max max-w-xl md:max-w-2xl">
            <SearchBox setTitle={setTitle} />
            <button
          className={`p-2 w-30 text-sm md:text-lg md:px-3 md:py-3 cursor-pointer rounded-xl bg-white text-black `}
          onClick={() => setToggle(!toggle)}
        >Create new link</button> 
          </div>
        </div>
        
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           {Array.from({ length: 6 }).map((_, i) => (
             <div key={i}>
               <Skeleton
                 baseColor="#1a1a1a"
                 highlightColor="#333"
                 height={140}
                 borderRadius={12}
               />
             </div>
           ))}
         </div>
        ) : (
          <div className="space-y-4">            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredArray.map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Card url={x.link} title={x.title} timestamp={x.timestamp} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toggle && <Popup setToggle={setToggle} setFetch={setFetch} value={value} />}
    </div>
  );
}
