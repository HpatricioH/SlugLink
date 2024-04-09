import NoneSvg from "~/utils/NoneSvg";

interface NoLinksProps {
  title: string
}

export default function NoLinks(props: NoLinksProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <NoneSvg className="fill-stone-400 h-16 w-16" />
      <p className="mb-6 tracking-wide font-bold">{props.title}</p>
    </div>
  )
}