import Link from "next/link";
import GetStartedSvg from "~/utils/GetStartedSvg";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
  type: string;
  arrayFeatures: string[];
}

export default function FeatureCard({title, description, icon, href, type, arrayFeatures}: FeatureCardProps) {
  return (
    <div className='flex flex-col gap-4 w-72 border border-white/10 rounded-md p-[0.85rem] lg:w-80'>
      <div className="flex gap-3 items-center">
        {icon}
        <h3 className="font-extrabold text-xl tracking-wide">{title}</h3>
      </div>
      <div className="mt-2 text-white/70">
        <p className="text-pretty">{description}</p>
      </div>
      <div>
        <p className="font-bold tracking-wide my-4"><span className="text-dark-violet">{type}</span> Management Features</p>
        <ul>
          {arrayFeatures.map((feature, index) => (
            <li key={index} className="text-white/70">{feature}</li>
          ))}
        </ul>
      </div>
      <div className="m-auto mt-7 mb-2">
        <Link href={href}>
          <div className="flex gap-2 items-center *:hover:fill-dark-violet *:hover:text-dark-violet">
            <GetStartedSvg className="fill-white h-5 w-5 "/>
            <p>Get Started</p>
          </div>
        </Link>
      </div>
    </div>
  )
}