'use client'

import { useRef, useState } from "react";
import { type FormEvent } from 'react'
import Button from "~/utils/Button";
import Accordion from "./Accordion";
import { api } from '~/trpc/react'
import { errorToastHandler, successToastHandler } from "~/utils/toastHandler";
import { useRouter } from "next/navigation";

interface QRFormProps {
  setQrModal: (value: boolean) => void
}

export default function QRForm(props: QRFormProps) {
  const [bgColor, setBgColor] = useState('')
  const [fgColor, setFgColor] = useState('')
  const [inputMargin, setInputMargin] = useState('3')
  const [urlError, setUrlError] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const inputClass = "input input-block"

  const createQRCode = api.qrCode.create.useMutation()

  async function handleSubmit(event: FormEvent<HTMLFormElement>, ref: React.RefObject<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { url = '', name = '' } = Object.fromEntries(formData) as Record<string, string>
    const margin = Number(inputMargin)

    if (!url || !name) { setUrlError(true) }

    if (url) {
      createQRCode.mutate({
        url,
        bgColor,
        fgColor,
        margin,
        name
      }, {
        onSuccess: () => {
          successToastHandler({ message: 'QR Code created successfully!' })
          props.setQrModal(false)
          router.refresh()
          ref.current?.reset()
        },
        onError: (opts) => {
          if (opts.message) {
            setUrlError(true)
            errorToastHandler({ message: 'Invalid URL' })
          }
        }
      })
    }
  }

  return (
    <section>
      <div className="divider my-2"></div>
      <form
        className="form-group"
        ref={ref}
        onSubmit={async (event) => {
          await handleSubmit(event, ref)
        }}
      >

        <div className="form-field">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Youtube Link"
            className={`${inputClass} ${urlError ? 'input-error' : ''}`}
            onFocus={() => setUrlError(false)} />
        </div>

        <div className="form-field">
          <label className="form-label">Paste URL:</label>
          <input
            type="text"
            name="url"
            placeholder="https://example.com"
            className={`${inputClass} ${urlError ? 'input-error' : ''}`}
            onFocus={() => setUrlError(false)} />
        </div>

        <Accordion
          setBgColor={setBgColor}
          bgColor={bgColor}
          setFgColor={setFgColor}
          fgColor={fgColor}
          setInputMargin={setInputMargin}
          inputMargin={inputMargin}
        />

        <Button
          type="submit"
          className={`mt-3 ${createQRCode.isLoading ? 'btn-loading' : ''}`}
          disabled={createQRCode.isLoading}>
          Create QR Code
        </Button>
      </form>
    </section>
  )
}