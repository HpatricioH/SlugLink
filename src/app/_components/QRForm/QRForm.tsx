'use client'

import { useQRCode } from "next-qrcode";
import Button from "~/utils/Button";


export default function QRForm() {
  const { Canvas } = useQRCode()
  const inputClass = "rounded-2xl bg-white/10 w-full mt-1 block px-3 py-2  border border-white/10 text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none"
  return (
    <>
      <form action="" className="flex flex-col gap-3">
        <label htmlFor="">Paste URL:</label>
        <input
          type="text"
          placeholder="https://example.com"
          className={inputClass} />
        <label htmlFor="">Description (Optional):</label>
        <textarea
          rows={3}
          cols={50}
          placeholder="e.g. URL for my blog post"
          className={`${inputClass} resize-none`} />
        <div>
          <Button
            className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50 mt-5"
          >
            + Create QR Code
          </Button>
        </div>
      </form>
      <Canvas
        text="https://example.com"
        options={{
          type: 'image/jpeg',
          quality: 0.3,
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }}
      />
    </>
  )
}