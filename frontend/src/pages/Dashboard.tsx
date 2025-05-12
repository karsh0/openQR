import { useState } from "react";
import { Button } from "../components/button";
import { Popup } from "../components/popup";

export default function Dashboard() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-black text-white relative">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button title="Create New Link" onClick={() => setToggle(!toggle)} dark={false} />
      </div>
      {toggle && <Popup setToggle={setToggle} />}
    </div>
  );
}
