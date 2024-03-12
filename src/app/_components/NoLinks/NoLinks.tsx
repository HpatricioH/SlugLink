import Link from "next/link";
import NoneSvg from "~/utils/NoneSvg";

export default function NoLinks() {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <NoneSvg className="fill-stone-400 h-16 w-16" />
      <p className="mb-6 tracking-wide font-bold">No Links or QR codes created</p>
      <Link
        href={'/create'}
        className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50"
      >
        + Create a Link
      </Link>
      <span >or</span>
      <Link
        href={'/qrcode'}
        className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50"
      >
        + Create a QR Code
      </Link>
    </div>
  )
}