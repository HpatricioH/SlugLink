'use client'

import { useRouter } from 'next/navigation';
import { trpc } from "~/utils/trpc";
import Button from "~/utils/Button";
import { successToastHandler } from '~/utils/toastHandler';
import ButtonError from '~/utils/ButtonError';

interface DeleteProps {
  setDeleteModal: (value: boolean) => void;
  id: number;
}

export default function Delete(props: DeleteProps) {
  const router = useRouter()

  const deleteLinkMutation = trpc.link.deleteLink.useMutation();

  const handleDeleteLink = () => {
    deleteLinkMutation.mutate({ id: props.id }, {
      onSuccess: () => {
        successToastHandler({ message: 'Link deleted successfully!' })
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
        <ButtonError
          onClick={handleDeleteLink}
          className={`${deleteLinkMutation.isLoading ? 'btn-loading' : ''} `}>
          Delete Link
        </ButtonError>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}