'use client'

import { useState } from "react";
import CopySvg from "~/utils/CopySvg";
import DeleteSvg from "~/utils/DeleteSvg";
import EditSvg from "~/utils/EditSvg";
import Modal from "~/ui/Modal";
import Delete from "../Delete/Delete";
import { errorToastHandler, successToastHandler } from "~/utils/toastHandler";

interface LinkProps {
  slug: string;
  description: string | null;
  id: number;
}


export default function Card({ slug, description, id }: LinkProps) {
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModal(true);
  }

  // const query = trpc.link.getLinks.useQuery();

  // console.log(query.data);


  const copyToClipboard = async () => {
    try {
      const copyLinkElement = document.getElementById(`copyLink${id}`);
      const textToCopy = copyLinkElement?.textContent ?? '';

      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      errorToastHandler({ message: 'Failed to copy link to clipboard!' });
    } finally {
      successToastHandler({ message: 'Link copied to clipboard!' });
    }
  };

  return (
    <section className="inline-block space-y-2 border border-white/10 bg-dark-midnight rounded-md relative px-4 py-2 w-full">
      <p id={`copyLink${id}`}>{`https://sluglink.com/${slug}`}</p>
      <div className="flex justify-between">
        <p className="text-sm font-thin">{description}</p>
      </div>
      <div className="relative flex gap-3 items-end justify-end *:fill-white *:w-5 *:h-5 *:cursor-pointer">
        <CopySvg className="hover:fill-dark-violet" onClick={copyToClipboard} />
        <EditSvg className="hover:fill-dark-violet" />
        <DeleteSvg className="hover:fill-dark-violet" onClick={handleDeleteModal} />
      </div>
      <Modal
        title="Are you sure you want to delete this link?"
        setState={setDeleteModal}
        state={deleteModal}
      >
        <Delete setDeleteModal={setDeleteModal} id={id} />
      </Modal>
    </section>
  )
}