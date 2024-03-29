'use client'

import { useRouter } from 'next/navigation';
import { trpc } from "~/utils/trpc";
import Button from "~/utils/Button";
import { successToastHandler } from '~/utils/toastHandler';

interface DeleteProps {
  setDeleteModal: (value: boolean) => void;
  id: number;
}

export default function Delete (props:DeleteProps) {
  const router = useRouter()
  const buttonClass = "border border-white rounded-3xl p-2 hover:border-white/80 hover:text-white/50";

  const deleteLinkMutation = trpc.link.deleteLink.useMutation();

  const handleDeleteLink = () => {
    deleteLinkMutation.mutate({id: props.id}, {
      onSuccess: () => {
        successToastHandler({ message: 'Link deleted successfully!'})
        props.setDeleteModal(false);
        router.refresh()
      }
    });
  }

  const handleCloseModal = () => {
    props.setDeleteModal(false);
  }

  return (
    <div className="text-white/50 pt-4">
      <p>If the link is deleted, this action cannot be reversed.</p>
      <div className="flex justify-end gap-3 pt-7 text-white">
        <Button className={buttonClass} onClick={handleDeleteLink}>Delete Link</Button>
        <Button className={buttonClass} onClick={handleCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}