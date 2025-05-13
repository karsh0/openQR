import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Popup } from "../components/popup";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { Card } from "../components/card";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/generate`, { withCredentials: true });
          console.log(res.data.card);
          setData(res.data.card)
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };
    
      fetchData();
    }, [toggle]);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-black text-white relative">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button title="Create New Link" onClick={() => setToggle(!toggle)} dark={false} />
      </div>
      <div className="max-w-2/3">

      <span className="text-2xl font-semibold">Your QR collections</span>
      <div className="flex flex-wrap gap-5">
      {data.map(x => (
        <Card url={x.link} title={x.title} timestamp={x.timestamp}/>
      ))}
      </div>
      </div>

      {toggle && <Popup setToggle={setToggle} />}
    </div>
  );
}
