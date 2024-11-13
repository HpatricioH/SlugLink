import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b-2 border-white/10">
      <ul className="navbar-start">
        <li>
          <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? 'text-dark-violet' : ''} navbar-item`}>Links</Link>
        </li>
        <li>
          <Link href={'/dashboard/qrCode'} className={`${pathname === '/dashboard/qrCode' ? 'text-dark-violet' : ''} navbar-item`}>QR Codes</Link>
        </li>
      </ul>
    </nav>
  )
}