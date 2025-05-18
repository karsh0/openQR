import QRCode from "react-qr-code";
import { Download } from "./download";
import { Copy, Trash } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

export function Card({id, url, title, timestamp, setFetch}: {id: number, url: string; title: string; timestamp: string, setFetch: (x:boolean) => void }) {
  const date = new Date(timestamp)

  function CopyClipboard(){
    console.log('copy')

    navigator.clipboard.writeText(url);
  }

  async function DeleteCard(){
    const res = await axios.post(`${BACKEND_URL}/delete`, {id}, {withCredentials: true});
    setFetch(true)
    console.log(res)
  }

  return (
    <div className="relative bg-white border border-gray-200 shadow text-black px-4 py-3 m-2 cursor-pointer rounded-xl flex justify-between">
      <div className="flex gap-4">
      <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
        <QRCode id={`${id}`} value={url} className="w-full h-full" />
      </div>

      <div className="absolute flex gap-3 items-center top-3 right-4">
        <button title="Copy to clipboard">
        <Copy className="hover:bg-gray-200 rounded-md p-1 w-6 h-6 md:w-7 md:h-7 transition" onClick={()=> CopyClipboard()}/>
        </button>
        <Download qrId={`${id}`}/>
        <Trash className="hover:bg-red-300 rounded-md p-1 w-6 h-6 md:w-7 md:h-7 transition" onClick={()=> DeleteCard()}/>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <div>
        <span className="text:lg md:text-2xl font-semibold text-wrap">{title}</span>
        </div>
        <a href={url} className="text-blue-600 text-sm md:text-lg break-words">{url}</a>
        <p className="text-gray-600 text-xs md:text-sm">{date.toLocaleString()}</p>
      </div>
      </div>
     
    </div>
  );
}
