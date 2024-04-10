'use client'

import { useQRCode } from "next-qrcode";
import { useState } from "react";
import Button from "~/utils/Button";
import Accordion from "./Accordion";
import { api } from '~/trpc/react'



export default function QRForm() {
  const [bgColor, setBgColor] = useState('')
  const [fgColor, setFgColor] = useState('')
  const [inputMargin, setInputMargin] = useState('3')
  const { Canvas } = useQRCode()
  const inputClass = "input input-block"

  // const qrCodeTest = api.qrCode.hello.useQuery({ text: 'Hello' })

  return (
    <section>
      <div className="divider my-2"></div>
      <form className="form-group">

        <div className="form-field">
          <label className="form-label">Paste URL:</label>
          <input
            type="text"
            placeholder="https://example.com"
            className={inputClass} />
        </div>

        <Accordion
          setBgColor={setBgColor}
          bgColor={bgColor}
          setFgColor={setFgColor}
          fgColor={fgColor}
          setInputMargin={setInputMargin}
          inputMargin={inputMargin}
        />

        <Button className="mt-3">
          Create QR Code
        </Button>

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