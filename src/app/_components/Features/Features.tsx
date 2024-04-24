import FeatureCard from "~/ui/featureCard";
import LinkSvg from "~/ui/svgs/LinkSvg";
import QrSvg from "~/ui/svgs/QrSvg";


const cardContent = [
  {
    title: "URL Shortener",
    description: "Manage your links with ease. SlugLink allows you to create, update, and delete links.",
    icon: <LinkSvg className="fill-amber-500 h-10 w-10" />,
    href: "/dashboard",
    type: "Link",
    arrayFeatures: [
      "URL shortening with ease",
      "Customize your links",
      "Track your links",
      "Organize your links"
    ]
  },
  {
    title: "QR Codes",
    description: "Create and manage QR codes. SlugLink allows you to create, update, and delete QR codes.",
    icon: <QrSvg className="fill-lime-400 h-10 w-10" />,
    href: "/dashboard/qrCode",
    type: "QR Code",
    arrayFeatures: [
      "Create QR Codes with ease",
      "Customizable QR Codes with ease",
      "Track your QR Codes",
      "Organize your QR Codes"
    ]
  }
]

// TODO: if not logged in, show a modal to sign in into the app. 
export default function Feature() {
  return (
    <section className="grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 z-3">
      {cardContent.map((card, i) => {
        return <FeatureCard
          key={i}
          title={card.title}
          description={card.description}
          icon={card.icon}
          href={card.href}
          type={card.type}
          arrayFeatures={card.arrayFeatures}
        />
      })}
    </section>
  )
}