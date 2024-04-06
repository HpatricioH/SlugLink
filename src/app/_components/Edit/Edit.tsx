'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type FormEvent } from 'react'
import Button from "~/utils/Button";
import ButtonError from "~/utils/ButtonError";
import { errorToastHandler, successToastHandler } from "~/utils/toastHandler";
import { trpc } from "~/utils/trpc";

interface EditProps {
  id: number;
  setEditModal: (value: boolean) => void;
}

export default function Edit(props: EditProps) {
  const ref = useRef<HTMLFormElement>(null)
  const [urlError, setUrlError] = useState(false)
  const router = useRouter()

  const getLink = trpc.link.getLink.useQuery({ id: props.id });
  const editLinkMutation = trpc.link.updateLink.useMutation();

  useEffect(() => {
    if (editLinkMutation.isSuccess) {
      getLink.refetch().then(() => {
        router.refresh()
      }).catch((error) => {
        throw new Error(error as string)
      });
    }
  }, [editLinkMutation.isSuccess, getLink, router])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {
      url = '',
      description = ''
    } = Object.fromEntries(formData) as Record<string, string>

    editLinkMutation.mutate({
      id: props.id,
      slug: getLink.data?.slug ?? '',
      url,
      description
    }, {
      onSuccess: () => {
        successToastHandler({ message: 'Link updated successfully!' })
        props.setEditModal(false)
      },
      onError: () => {
        setUrlError(true)
        errorToastHandler({ message: 'Invalid URL!' })
      }
    })
  }

  const handleCloseModal = () => {
    props.setEditModal(false)
  }

  return (
    <>
      <div className="divider my-2"></div>
      <form
        ref={ref}
        className="flex flex-col gap-3 text-white"
        onSubmit={async (e) => {
          await onSubmit(e)
        }}
      >
        <div className="form-field mt-1">
          <label className="pt-3 form-label">New long URL:</label>
          <input
            type="text"
            name='url'
            placeholder="https://example.com"
            className={`input input-block ${urlError ? 'input-error' : ''}`}
            defaultValue={getLink.data?.url}
          />
        </div>
        <div className="form-field mt-1">
          <label className="pt-3 form-label">Description (Optional):</label>
          <textarea
            className={`textarea textarea-block resize-none`}
            name="description"
            rows={3}
            cols={50}
            placeholder="e.g. URL for my blog post"
            defaultValue={getLink.data?.description ?? ''}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button
            className={`${editLinkMutation.isLoading ? 'btn-loading' : ''}`}
            disabled={editLinkMutation.isLoading}
          > Edit Link
          </Button>
          <ButtonError type="button" onClick={handleCloseModal}>Cancel</ButtonError>
        </div>
      </form>
    </>
  )
}