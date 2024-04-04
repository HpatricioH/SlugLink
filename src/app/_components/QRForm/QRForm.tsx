'use client'

import { useQRCode } from "next-qrcode";
import { useState } from "react";
import Button from "~/utils/Button";


export default function QRForm() {
  const [bgColor, setBgColor] = useState('')
  const [fgColor, setFgColor] = useState('')
  const { Canvas } = useQRCode()
  const inputClass = "rounded-2xl bg-white/10 mt-1 block px-3 py-2 border border-white/10 text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none"
  return (
    <section>
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

        <div className="accordion-group accordion-group-hover">
          <div className="accordion">
            <input type="checkbox" id="toggle-5" className="accordion-toggle" />
            <label htmlFor="toggle-5" className="accordion-title">Options</label>
            <span className="accordion-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
            </span>
            <div className="accordion-content">
              <div className="min-h-0 [&>p]:my-2">
                <p>Background color:</p>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="#151f42"
                      className={inputClass}
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                  <div className="self-center">
                    <input
                      type="color"
                      className="w-[4.5rem] h-8 rounded-md"
                      onChange={(e) => setBgColor(e.target.value)}
                      value={bgColor}
                    />
                  </div>
                </div>
                <p>Foreground color:</p>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="#151f42"
                      className={inputClass}
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                    />
                  </div>
                  <div className="self-center">
                    <input
                      type="color"
                      className="w-[4.5rem] h-8 rounded-md"
                      onChange={(e) => setFgColor(e.target.value)}
                      value={fgColor}
                    />
                  </div>
                </div>
                <p>Margin:</p>
                <div>
                  <input
                    type="number"
                    placeholder="3"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion">
            <input type="checkbox" id="toggle-6" className="accordion-toggle" />
            <label htmlFor="toggle-6" className="accordion-title">Logo</label>
            <span className="accordion-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
            </span>
            <div className="accordion-content">
              <div className="min-h-0">
                <div>
                  <label>Include Log </label>
                  <input type="checkbox" />
                </div>
                <div>
                  <p>Logos:</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button
            className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50 mt-5"
          >
            + Create QR Code
          </Button>
        </div>
      </form>
      {/* <div id="qrCanvas" className="self-center">
        <Canvas
          text="https://example.com"
          options={{
            type: 'image/jpeg',
            quality: 0.3,
            errorCorrectionLevel: 'M',
            margin: 2,
            scale: 4,
            width: 150,
            color: {
              dark: '#000000',
              light: '#ffffff'
            }
          }}
        />
      </div> */}
    </section>
  )
}