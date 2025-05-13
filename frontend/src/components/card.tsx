import QRCode from "react-qr-code";

export function Card({url, title, timestamp}:{url: string, title:string, timestamp: string}){
    return <div className="bg-white shadow-white shadow-sm text-black px-4 py-3 m-2 cursor-pointer rounded-xl flex gap-4">
        <QRCode value={url} className="w-25 h-25"/>
        <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">{title}</span>
        <p className="text-gray-600">{url}</p>
        <p className="text-gray-600 text-sm">{timestamp}</p>
        </div>
    </div>
}