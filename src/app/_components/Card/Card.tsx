export default function Card() {
  return (
    <article className="overflow-hidden p-px relative rounded-md bg-neutral-600">
      <div className="glow inset-0 w-[100px] h-[100px] absolute rotate-45"></div>
      <section className="inline-block space-y-2 bg-dark-midnight rounded-md z-10 relative px-5 py-2">
        <h1 className="uppercase">Minimalistic Card</h1>
        <p className="text-sm font-thin">This is a minimalistic card with an animated gradient border.</p>
      </section>
    </article>
  )
}