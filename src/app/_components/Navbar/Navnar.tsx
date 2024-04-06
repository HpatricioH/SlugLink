import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b-2 border-white/10 pt-3">
      <ul className="navbar-start">
        <li>
          <Link href={'/dashboard'} className="navbar-item">Links</Link>
        </li>
        <li>
          <Link href={'/dashboard/qrCode'} className="navbar-item">QR Codes</Link>
        </li>
      </ul>
    </nav>
  )
}