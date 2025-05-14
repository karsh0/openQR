import QRCode from "react-qr-code";

export function Card({ url, title, timestamp }: { url: string; title: string; timestamp: string }) {
  const date = new Date(timestamp)
  return (
    <div className="relative bg-white shadow-white shadow-sm text-black px-4 py-3 m-2 cursor-pointer rounded-xl flex justify-between">
      <div className="flex gap-2">
      <div className="w-[100px] h-[100px]">
        <QRCode id="QRCode" value={url} className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <span className="text-xl font-semibold text-wrap">{title}</span>
        <a href={url} className="text-blue-600 text-sm break-words">{url}</a>
        <p className="text-gray-600 text-sm">{date.toLocaleString()}</p>
      </div>
      </div>
      <div className="absolute top-1 right-1">
      <input
              type="button"
              value="Download QR"
              className="bg-green-700 px-2 py-2 text-sm text-white rounded-xl"
              onClick={() => {
                const svg = document.getElementById("QRCode");
                // @ts-ignore
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.onload = () => {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  if(!ctx) return;
                  ctx.drawImage(img, 0, 0);
                  ctx.fillStyle = "white";
                  const pngFile = canvas.toDataURL("image/png");
                  const downloadLink = document.createElement("a");
                  downloadLink.download = "QRCode";
                  downloadLink.href = `${pngFile}`;
                  downloadLink.click();
                };
                img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
              }}
            />
      </div>
    </div>
  );
}
