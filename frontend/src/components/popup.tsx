import { useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { X } from "lucide-react";
import QRCode from "react-qr-code";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { data, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type PopupProps = {
  setToggle: (value: boolean) => void;
  fetch: boolean;
  setFetch: (value: boolean) => void;
  value: string | null;
};

export function Popup({ setToggle, fetch, setFetch, value }: PopupProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const customRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState(value || "");
  const navigate = useNavigate();
  const { getToken }  = useAuth()


  async function createQr() {
    const title = titleRef.current?.value;
        const token = await getToken()

    const res = await axios.post(`${BACKEND_URL}/create`, {
          title,
          link: url,
        }, 
      {
          headers: {
          Authorization: `Bearer ${token}`
          },
        withCredentials: true
      }
);

    console.log(res);
    setToggle(false);
    setFetch(!fetch);
    navigate("/dashboard");
  }

  return (
    <div className="bg-white text-black border border-gray-100 p-6 rounded-2xl shadow-xl w-80 md:w-96 flex flex-col gap-4 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <X
        className="absolute right-4 top-4 cursor-pointer"
        onClick={() => setToggle(false)}
      />

      <h2 className="text-xl font-semibold">Create New QR</h2>

      <div className="w-40 h-40 flex items-center justify-center rounded-lg">
        {url ? (
          <QRCode id="QRCode" value={url} />
        ) : (
          <img
            className="w-full h-full object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
            alt="Placeholder QR"
          />
        )}
      </div>

      <Input placeholder="Title" ref={titleRef} />

      <input
        type="text"
        placeholder="Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 px-4 border border-gray-400 rounded-md"
      />

      <div className="w-full flex gap-2">
        <input
          type="text"
          value="localhost:3000/"
          disabled
          className="w-fit bg-gray-100 text-gray-600 p-2 rounded-md"
        />
        <Input placeholder="custom" ref={customRef} />
      </div>

      <Button title="Create" onClick={createQr} dark={true} />
    </div>
  );
}
