'use client'

import { useQRCode } from "next-qrcode"
import DeleteSvg from "~/utils/DeleteSvg";
import DownloadSvg from "~/utils/DownloadSvg";
import EditSvg from "~/utils/EditSvg";

interface QRCardProps {
  bgColor: string;
  fgColor: string;
  margin: number;
  url: string;
  name: string
}

export default function QRCard(props: QRCardProps) {
  const { Canvas } = useQRCode()

  return (
    <section className="inline-block border border-white/10 bg-dark-midnight rounded-md relative">
      <div className="card-body">
        <h2 className="card-header justify-center">{props.name}</h2>
        <div className="self-center">
          <Canvas
            text={props.url}
            options={{
              type: 'image/jpeg',
              quality: 0.3,
              errorCorrectionLevel: 'M',
              margin: props.margin,
              scale: 4,
              width: 120,
              color: {
                dark: props.fgColor,
                light: props.bgColor
              }
            }}
          />
        </div>
        <div className="card-footer justify-center pt-3 *:fill-white *:w-5 *:h-5 *:cursor-pointer gap-4">
          <span className="tooltip tooltip-bottom" data-tooltip="Download">
            <DownloadSvg className=" hover:fill-dark-violet " />
          </span>
          <span className="tooltip tooltip-bottom" data-tooltip="Edit">
            <EditSvg className="hover:fill-dark-violet" />
          </span>
          <span className="tooltip tooltip-bottom" data-tooltip="Delete">
            <DeleteSvg className="hover:fill-dark-violet" />
          </span>
        </div>
      </div>
    </section>
  )
}