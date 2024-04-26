import { api } from "~/trpc/server"
import QRCard from "./QRCard"
import NoLinks from "../NoLinks/NoLinks"

interface QRContainerProps {
  image?: string | null | undefined;
  query: string
}

export default async function QRCardContainer(props: QRContainerProps) {
  const getQRCodes = await api.qrCode.getQRCodes.query()

  const filteredQRCodes = getQRCodes?.filter((code) => {
    return code?.name?.toLowerCase().includes(props.query.toLowerCase());
  });

  if (filteredQRCodes.length === 0) {
    return <NoLinks title="No QR Codes found!" />
  }

  return (
    <div className="mt-5 linkCard">
      {filteredQRCodes?.map((qrCode) => {
        return <QRCard
          key={qrCode.id}
          id={qrCode.id}
          bgColor={qrCode.bgColor}
          fgColor={qrCode.fgColor}
          margin={qrCode.margin}
          url={qrCode.url}
          name={qrCode.name ?? ''}
          image={props.image}
        />
      })}
    </div>
  )
}