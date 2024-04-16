'use client'

import { useQRCode } from "next-qrcode"
import Image from "next/image";
import DeleteSvg from "~/utils/DeleteSvg";
import DownloadSvg from "~/utils/DownloadSvg";
import EditSvg from "~/utils/EditSvg";

interface QRCardProps {
  bgColor: string;
  fgColor: string;
  margin: number;
  url: string;
  name: string;
  image: string | null | undefined
}

export default function QRCard(props: QRCardProps) {
  const { Canvas } = useQRCode()

  return (
    <section className="inline-block space-y-2 border border-white/10 bg-dark-midnight rounded-md relative px-4 py-2 w-full">
      <p>{props.name}</p>
      <div className="flex justify-between">
        <Image
          src={props.image ?? '/images/person-fill.svg'}
          alt='user image'
          width={20}
          height={20}
          className='rounded-xl' />
        <p className="text-sm font-thin">{props.url}</p>
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
    </section>
  )
}