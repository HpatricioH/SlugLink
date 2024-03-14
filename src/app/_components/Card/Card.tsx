import CopySvg from "~/utils/CopySvg";
import DeleteSvg from "~/utils/DeleteSvg";
import EditSvg from "~/utils/EditSvg";

interface LinkProps {
  slug: string;
  description: string | null;
}


export default function Card({ slug, description }: LinkProps) {
  return (
    <section className="inline-block space-y-2 border border-white/10 bg-dark-midnight rounded-md relative px-4 py-2 w-full">
      <p>{`https://sluglink.com/${slug}`}</p>
      <div className="flex justify-between">
        <p className="text-sm font-thin">{description}</p>
      </div>
      <div className="flex gap-3 items-end justify-end *:fill-white *:w-5 *:h-5 *:cursor-pointer">
        <CopySvg className="hover:fill-dark-violet" />
        <EditSvg className="hover:fill-dark-violet" />
        <DeleteSvg className="hover:fill-dark-violet" />
      </div>
    </section>
  )
}