'use client'

import { useRef } from "react";
import Button from "~/utils/Button";
import { trpc } from "~/utils/trpc";

interface EditProps {
  id: number;
}

export default function Edit(props: EditProps) {
  const ref = useRef<HTMLFormElement>(null)
  const inputClass = 'rounded-2xl bg-white/10 w-full block px-3 py-2 border text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none'
  const buttonClass = "border border-white rounded-3xl p-2 hover:border-white/80 hover:text-white/50";

  const getLink = trpc.link.getLink.useQuery({ id: props.id });

  const handleCloseModal = () => {
    // setEditModal(false);
  }

  return (
    <form
      ref={ref}
      className="flex flex-col gap-3 text-white"
    // onSubmit={async (event) => {
    //   await onSubmit(event, ref)
    // }}
    >
      <label className="pt-3">New long URL:</label>
      <input
        type="text"
        name='url'
        placeholder="https://example.com"
        className={`${inputClass} border-white/10`}
        defaultValue={getLink.data?.url}
      // onFocus={() => setUrlError(false)} 
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
        // disabled={createLink.isLoading}
        > Edit Link
        </Button>
        <Button className={buttonClass} onClick={handleCloseModal}>Cancel</Button>
      </div>
    </form>
  )
}