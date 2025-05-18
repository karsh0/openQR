import { DownloadIcon } from "lucide-react";

export function Download({qrId}:{qrId: string}) {
  const handleDownload = () => {
    const svg = document.getElementById(qrId);
    if (!svg) return;

    // @ts-ignore
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center p-1 w-6 h-6 md:w-7 md:h-7 rounded-md hover:bg-gray-200 transition"
      title="Download QR Code"
    >
      <DownloadIcon />
    </button>
  );
}
