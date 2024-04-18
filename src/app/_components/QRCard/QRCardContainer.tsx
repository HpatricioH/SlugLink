import { api } from "~/trpc/server"
import QRCard from "./QRCard"
import NoLinks from "../NoLinks/NoLinks"

interface QRContainterProps {
  image?: string | null | undefined;
}

export default async function QRCardContainer(props: QRContainterProps) {
  const getQRCodes = await api.qrCode.getQRCodes.query()

  if (getQRCodes.length === 0) {
    return <NoLinks title="No QR Codes created!" />
  }

  return (
    <div className="mt-5 linkCard">
      {getQRCodes.map((qrCode) => {
        return <QRCard
          key={qrCode.id}
          id={qrCode.id}
          bgColor={qrCode.bgColor}
          fgColor={qrCode.fgColor}
          margin={qrCode.margin}
          url={qrCode.url}
          name={qrCode.name}
          image={props.image}
        />
      })}
    </div>
  )
}