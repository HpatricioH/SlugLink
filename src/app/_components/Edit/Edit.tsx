'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { type FormEvent } from 'react'
import Button from "~/utils/Button";
import { successToastHandler } from "~/utils/toastHandler";
import { trpc } from "~/utils/trpc";

interface EditProps {
  id: number;
  setEditModal: (value: boolean) => void;
}

export default function Edit(props: EditProps) {
  const ref = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const getLink = trpc.link.getLink.useQuery({ id: props.id });
  const editLinkMutation = trpc.link.updateLink.useMutation();

  const inputClass = 'rounded-2xl bg-white/10 w-full block px-3 py-2 border text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none'
  const buttonClass = "border border-white rounded-3xl p-2 hover:border-white/80 hover:text-white/50";

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
      }
    })
  }

  const handleCloseModal = () => {
    props.setEditModal(false)
  }

  return (
    <form
      ref={ref}
      className="flex flex-col gap-3 text-white"
      onSubmit={async (e) => {
        await onSubmit(e)
      }}
    >
      <label className="pt-3">New long URL:</label>
      <input
        type="text"
        name='url'
        placeholder="https://example.com"
        className={`${inputClass} border-white/10`}
        defaultValue={getLink.data?.url}
      />
      <label className="pt-3">Description (Optional):</label>
      <textarea
        className={`${inputClass} resize-none border-white/10`}
        name="description"
        rows={3}
        cols={50}
        placeholder="e.g. URL for my blog post"
        defaultValue={getLink.data?.description ?? ''}
      />
      <div className="flex justify-end gap-3 pt-4">
        <Button className={buttonClass}
          disabled={editLinkMutation.isLoading}
        > Edit Link
        </Button>
        <Button type="button" className={buttonClass} onClick={handleCloseModal}>Cancel</Button>
      </div>
    </form>
  )
}