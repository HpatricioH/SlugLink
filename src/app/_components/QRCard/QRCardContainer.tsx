import { api } from "~/trpc/server"
import QRCard from "./QRCard"
import NoLinks from "../NoLinks/NoLinks"

export default async function QRCardContainer() {
  const getQRCodes = await api.qrCode.getQRCodes.query()

  if (getQRCodes.length === 0) {
    return <NoLinks title="No QR Codes created!" />
  }

  return (
    <div className="mt-5 linkCard">
      {getQRCodes.map((qrCode) => {
        return <QRCard key={qrCode.id} bgColor={qrCode.bgColor} fgColor={qrCode.fgColor} margin={qrCode.margin} url={qrCode.url} name={qrCode.name} />
      })}
    </div>
  )
}