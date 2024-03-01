export default function Spinner () {
  return (
    <div className="inline-flex flex-col items-center justify-center gap-3">
      <div className="relative size-3">
        <div className="absolute rounded-full border-2 border-blue-100 size-3"></div>
        <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" className="absolute animate-spin stroke-slate-800" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 23C18.5751 23 23.5 18.0751 23.5 12C23.5 5.92487 18.5751 1 12.5 1C6.42487 1 1.5 5.92487 1.5 12" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}