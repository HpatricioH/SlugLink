'use client'

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { type FormEvent } from 'react'
import { api } from '~/trpc/react'
import Button from '~/utils/Button'
import { successToastHandler, errorToastHandler } from "~/utils/toastHandler";

export default function CreateLink() {
  const [urlError, setUrlError] = useState(false)
  const [slugError, setSlugError] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const inputClass = 'rounded-2xl bg-white/10 w-full mt-1 block px-3 py-2 border text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none'

  const createLink = api.link.create.useMutation()

  async function onSubmit(event: FormEvent<HTMLFormElement>, ref: React.RefObject<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const {
      url = '',
      slug = '',
      description = ''
    } = Object.fromEntries(formData) as Record<string, string>

    if (slug === '') { setSlugError(true) }
    if (!url || url.trim() === '') { setUrlError(true) }

    if (url && slug) {
      createLink.mutate({
        url,
        slug,
        description
      }, {
        onSuccess: () => {
          successToastHandler({ message: 'Link created successfully!' })
          router.push('/dashboard')
          router.refresh()
          ref.current?.reset()
        },
        onError: (opts) => {
          const errorMessage = opts.message.toString();

          if (errorMessage.includes('Invalid url')) {
            setUrlError(true)
            errorToastHandler({ message: 'Invalid URL' })
          } else {
            errorToastHandler({ message: 'Slug already exists! Try another customize link.' })
          }
        }
      })
    }
  }

  return (
    <form
      ref={ref}
      className="flex flex-col gap-3"
      onSubmit={async (event) => {
        await onSubmit(event, ref)
      }}>
      <label htmlFor="">Paste a long URL:</label>
      <input
        type="text"
        name='url'
        placeholder="https://example.com"
        className={`${inputClass} ${urlError ? 'border-red-500' : 'border-white/10'}`}
        onFocus={() => setUrlError(false)} />
      <label htmlFor="">Customize your link:</label>
      <input
        type="text"
        name='slug'
        placeholder="https://sluglink.com/your-link"
        className={`${inputClass} ${slugError ? 'border-red-500' : 'border-white/10'}`}
        onFocus={() => setSlugError(false)} />
      <label htmlFor="">Description (Optional):</label>
      <textarea
        name="description"
        rows={3}
        cols={50}
        placeholder="e.g. URL for my blog post"
        className={`${inputClass} resize-none border-white/10`} />
      <div>
        <Button
          type="submit"
          className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50 mt-5"
          disabled={createLink.isLoading}
        >
          {createLink.isLoading ? "Submitting..." : "+ Create Link"}
        </Button>
      </div>
    </form>
  )
}