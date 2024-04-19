'use client'

import Image from "next/image";
import { useState } from "react";
import Modal from "~/ui/Modal";
import DeleteSvg from "~/utils/DeleteSvg";
import DownloadSvg from "~/utils/DownloadSvg";
import Delete from "../Delete/Delete";
import { trpc } from "~/utils/trpc";
import { successToastHandler } from "~/utils/toastHandler";
import { useRouter } from "next/navigation";
import DownloadQR from "../DownloadQRCode/DownloadQR";

interface QRCardProps {
  id: number,
  bgColor: string;
  fgColor: string;
  margin: number;
  url: string;
  name: string;
  image: string | null | undefined
}

export default function QRCard(props: QRCardProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const router = useRouter()

  const deleteQRCode = trpc.qrCode.deleteQRCode.useMutation()

  const handleDownloadModal = () => {
    setDownloadModal(true)
  }

  const handleDeleteModal = () => {
    setDeleteModal(true);
  }

  const handleDeleteQRCode = () => {
    deleteQRCode.mutate({ id: props.id }, {
      onSuccess: () => {
        successToastHandler({ message: 'QR Code deleted successfully!' })
        setDeleteModal(false);
        router.refresh()
      }
    });
  }

  return (
    <section className="inline-block space-y-2 border border-white/10 bg-dark-midnight rounded-md relative px-4 py-2 w-full">
      <p>{props.name}</p>
      <div className="flex gap-2 h-5">
        <Image
          src={props.image ?? '/images/person-fill.svg'}
          alt='user image'
          width={20}
          height={20}
          className='rounded-xl' />
        <p className="text-sm font-thin">{props.url}</p>
      </div>
      <div className="card-footer justify-end pt-5 *:fill-white *:w-5 *:h-5 *:cursor-pointer gap-4">
        <span className="tooltip tooltip-bottom" data-tooltip="Download">
          <DownloadSvg className=" hover:fill-dark-violet " onClick={handleDownloadModal} />
        </span>
        <span className="tooltip tooltip-bottom" data-tooltip="Delete">
          <DeleteSvg className="hover:fill-dark-violet" onClick={handleDeleteModal} />
        </span>
      </div>
      <Modal
        title="Download QR Code"
        state={downloadModal}
        setState={setDownloadModal}>
        <DownloadQR url={props.url} margin={props.margin} bgColor={props.bgColor} fgColor={props.fgColor} setDownloadModal={setDownloadModal} />
      </Modal>
      <Modal
        title="Are you sure you want to delete this QR Code?"
        state={deleteModal}
        setState={setDeleteModal}>
        <Delete type="QR Code" isLoading={deleteQRCode.isLoading} setDeleteModal={setDeleteModal} handleClick={handleDeleteQRCode} />
      </Modal>
    </section>
  )
}