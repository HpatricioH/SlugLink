'use client'

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { type FormEvent } from 'react'
import { api } from '~/trpc/react'
import Button from '~/utils/Button'
import { successToastHandler, errorToastHandler } from "~/utils/toastHandler";

interface CreateLinkProps {
  setCreateModal: (value: boolean) => void
}

export default function CreateLink(props: CreateLinkProps) {
  const [urlError, setUrlError] = useState(false)
  const [slugError, setSlugError] = useState(false)
  const [randomSlug, setRandomSlug] = useState("")
  const [slug, setSlug] = useState('');
  const ref = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const createLink = api.link.create.useMutation()

  const randomizeSlug = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const length = 5
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setRandomSlug(result)
  }

  console.log(randomSlug)
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
          props.setCreateModal(false)
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
    <>
      <div className="divider my-2"></div>
      <form
        ref={ref}
        className="flex flex-col gap-3"
        onSubmit={async (event) => {
          await onSubmit(event, ref)
        }}>
        <div className="form-field mt-1">
          <label className="form-label">Paste a long URL:</label>
          <input
            type="text"
            name='url'
            placeholder="https://example.com"
            className={`input input-block ${urlError ? 'input-error' : ''}`}
            onFocus={() => setUrlError(false)} />
        </div>
        <div className="form-field mt-1">
          <label className="form-label">Customize your link:</label>
          <div className="flex relative">
            <input
              type="text"
              name='slug'
              placeholder={`myLink`}
              className={`input input-block ${slugError ? 'input-error' : ''}`}
              defaultValue={randomSlug}
              onFocus={() => setSlugError(false)} />
            <Button
              className="absolute right-0"
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => randomizeSlug(e)}>
              Randomize
            </Button>
          </div>
        </div>
        <div className="form-field mt-1">
          <label className="form-label">Description (Optional):</label>
          <textarea
            name="description"
            rows={3}
            cols={50}
            placeholder="e.g. URL for my blog post"
            className={`textarea textarea-block resize-none`} />
          <div className="self-end mt-4">
          </div>
          <Button
            type="submit"
            className={`${createLink.isLoading ? 'btn-loading' : ''}`}
            disabled={createLink.isLoading}>
            Create Link
          </Button>
        </div>
      </form >

    </>
  )
}