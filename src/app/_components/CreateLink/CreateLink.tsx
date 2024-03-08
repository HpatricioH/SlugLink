'use client'

import { api } from '~/trpc/react'
import Button from '~/utils/Button'

export default function CreateLink() {
  const inputClass = "rounded-2xl bg-white/10 w-full mt-1 block px-3 py-2  border border-white/10 text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none"

  return (
    <form action="" className="flex flex-col gap-3">
      <label htmlFor="">Paste a long URL:</label>
      <input
        type="text"
        placeholder="https://example.com"
        className={inputClass} />
      <label htmlFor="">Customize your link:</label>
      <input
        type="text"
        placeholder="https://sluglink.com/your-link"
        className={inputClass} />
      <label htmlFor="">Description (Optional):</label>
      <textarea
        rows={3}
        cols={50}
        placeholder="e.g. URL for my blog post"
        className={`${inputClass} resize-none`} />
      <div>
        <Button
          type="submit"
          className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50 mt-5"
        >
          + Create Link
        </Button>
      </div>
    </form>
  )
}