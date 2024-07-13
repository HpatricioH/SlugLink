'use client'

import Button from "~/utils/Button";
import ButtonError from '~/utils/ButtonError';

interface DeleteProps {
  type: string,
  isLoading: boolean,
  setDeleteModal: (value: boolean) => void;
  handleClick: () => void
}

export default function Delete(props: DeleteProps) {

  const handleCloseModal = async () => {
    props.setDeleteModal(false);
  }

  return (
    <div className="text-white/50 pt-4">
      <p>If the {props.type} is deleted, this action cannot be reversed.</p>
      <div className="flex justify-end gap-3 pt-7 text-white">
        <ButtonError
          onClick={props.handleClick}
          className={`${props.isLoading ? 'btn-loading' : ''} `}>
          Delete Link
        </ButtonError>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}