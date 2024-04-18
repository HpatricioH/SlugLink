import { useQRCode } from "next-qrcode"
import Button from "~/utils/Button"

interface DownloadQRProps {
  url: string,
  margin: number,
  bgColor: string,
  fgColor: string
}

export default function DownloadQR(props: DownloadQRProps) {
  const { Canvas } = useQRCode()

  return (
    <section className="flex flex-col justify-center gap-3 pt-4">
      <div className="self-center">
        <Canvas
          text={props.url}
          options={{
            type: 'image/jpeg',
            quality: 0.3,
            errorCorrectionLevel: 'M',
            margin: props.margin,
            scale: 4,
            width: 150,
            color: {
              dark: props.fgColor,
              light: props.bgColor
            }
          }}
        />
      </div>
      <Button>
        Download
      </Button>
    </section>
  )
}