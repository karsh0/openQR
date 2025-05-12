import { useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";

export function Popup() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const customRef = useRef<HTMLInputElement | null>(null);

  function createQr() {
    const title = titleRef.current?.value;
    const url = urlRef.current?.value;
    const custom = customRef.current?.value;
    console.log({ title, url, custom });
  }

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-xl w-96 flex flex-col gap-4 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-xl font-semibold">Create New QR</h2>
      <div className="w-40 flex items-center justify-center rounded-lg">
        <img src="https://qzzrrddwnmtnhjezewst.supabase.co/storage/v1/object/public/qrs/qr-1ts7as" alt="qr" />
        </div>
      <Input placeholder="Title" ref={titleRef} />
      <Input placeholder="Long URL" ref={urlRef} />
      <div className="w-full flex gap-2">
        <input type="text" value="localhost:3000/" disabled className="w-fit bg-gray-100 text-gray-600 p-2 rounded-md" />
        <Input placeholder="custom-path" ref={customRef} />
      </div>
      <Button title="Create" onClick={createQr} dark={true}/>
    </div>
  );
}
