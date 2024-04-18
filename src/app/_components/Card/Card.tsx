'use client'

import { useState } from "react";
import CopySvg from "~/utils/CopySvg";
import DeleteSvg from "~/utils/DeleteSvg";
import EditSvg from "~/utils/EditSvg";
import Modal from "~/ui/Modal";
import Delete from "../Delete/Delete";
import { errorToastHandler, successToastHandler } from "~/utils/toastHandler";
import Edit from "../Edit/Edit";
import { useRouter } from "next/navigation";
import { trpc } from "~/utils/trpc";

interface LinkProps {
  slug: string;
  description: string | null;
  id: number;
}


export default function Card({ slug, description, id }: LinkProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const router = useRouter()

  const deleteLinkMutation = trpc.link.deleteLink.useMutation();

  const handleDeleteModal = () => {
    setDeleteModal(true);
  }

  const handleEditModal = () => {
    setEditModal(true);
  }

  const handleDeleteLink = () => {
    deleteLinkMutation.mutate({ id: id }, {
      onSuccess: () => {
        successToastHandler({ message: 'Link deleted successfully!' })
        setDeleteModal(false);
        router.refresh()
      }
    });
  }

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
        <span className="tooltip tooltip-bottom" data-tooltip="Copy">
          <CopySvg className="hover:fill-dark-violet" onClick={copyToClipboard} />
        </span>
        <span className="tooltip tooltip-bottom" data-tooltip="Edit">
          <EditSvg className="hover:fill-dark-violet" onClick={handleEditModal} />
        </span>
        <span className="tooltip tooltip-bottom" data-tooltip="Delete">
          <DeleteSvg className="hover:fill-dark-violet" onClick={handleDeleteModal} />
        </span>
      </div>
      <Modal
        title="Edit Link"
        setState={setEditModal}
        state={editModal}>
        <Edit id={id} setEditModal={setEditModal} />
      </Modal>
      <Modal
        title="Are you sure you want to delete this link?"
        setState={setDeleteModal}
        state={deleteModal}>
        <Delete
          type='link'
          setDeleteModal={setDeleteModal}
          handleClick={handleDeleteLink}
          isLoading={deleteLinkMutation.isLoading}
        />
      </Modal>
    </section>
  )
}