import Link from "next/link";
import CheckSvg from "~/utils/CheckSvg";
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
    <div className='flex flex-col gap-6 w-72 border border-white/10 rounded-md p-[0.85rem] lg:w-80 bg-dark-midnight shadow-lg shadow-dark-violet/50'>
      <div className="flex gap-3 items-center">
        {icon}
        <h3 className="font-extrabold text-xl tracking-wide">{title}</h3>
      </div>
      <div className="my-3 text-white/70">
        <p className="text-pretty ">{description}</p>
      </div>
      <hr />
      <div>
        <p className="font-bold tracking-wide my-4"><span className="text-dark-violet">{type}</span> Management Features</p>
        <ul className="flex flex-col gap-4">
          {arrayFeatures.map((feature, index) => (
            <li key={index} className="text-white/70 flex items-center">
              <CheckSvg className="fill-white w-6 h-6 pt-1"/>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="m-auto mt-7 mb-2">
        <Link href={href}>
          <div className="flex gap-2 items-center border rounded-2xl p-3 border-white hover:border-white/50 *:hover:fill-white/50 *:hover:text-white/50">
            <GetStartedSvg className="fill-white h-5 w-5 "/>
            <p>Get Started</p>
          </div>
        </Link>
      </div>
    </div>
  )
}