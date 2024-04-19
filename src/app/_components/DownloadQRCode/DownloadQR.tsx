import { useQRCode } from "next-qrcode"
import Button from "~/utils/Button"
import { convertCanvasToFile, downloadFile } from "~/utils/qrCodeDownloader"
import { errorToastHandler } from "~/utils/toastHandler"

interface DownloadQRProps {
  setDownloadModal: (value: boolean) => void,
  url: string,
  margin: number,
  bgColor: string,
  fgColor: string
}

export default function DownloadQR(props: DownloadQRProps) {
  const { Canvas } = useQRCode()

  async function handleDownload() {
    try {
      const canvasElement = document.getElementById('qr-canva')?.children[0] as HTMLCanvasElement
      const file = await convertCanvasToFile(canvasElement);
      downloadFile(file)
      props.setDownloadModal(false)
    } catch (error) {
      errorToastHandler({ message: 'Failed to download file' });
    }
  }

  return (
    <section className="flex flex-col justify-center gap-4 pt-4">
      <div id={'qr-canva'} className="self-center">
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
      <Button onClick={handleDownload}>
        Download
      </Button>
    </section>
  )
}