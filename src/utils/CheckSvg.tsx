import { type SvgProps } from "./HamburgerSvg"


export default function CheckSvg({ className, ...props }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      stroke="rgb(148 163 184 / 0.05)"
      {...props}
    >
      <g>
        <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
      </g>
    </svg>
  )
}
