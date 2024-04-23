'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "~/ui/Modal";
import AddSvg from "~/utils/AddSvg";
import Button from "~/utils/Button";
import CreateLink from "../CreateLink/CreateLink";
import QRForm from "../QRForm/QRForm";
import SearchLinks from "../SearchLinks/SearchLinks";
import SearchQRCodes from "../SearchQRCodes/SearchQRCodes";

export default function ActionBar() {
  const [createModal, setCreateModal] = useState(false)
  const [qrModal, setQrModal] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-3 md:flex-row  justify-between">
      <div >
        {pathname === '/dashboard' ?
          <SearchLinks pathname={pathname} /> :
          <SearchQRCodes pathname={pathname} />
        }
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        {pathname === '/dashboard' ?
          <Button onClick={() => setCreateModal(true)}>
            <div className="flex gap-1">
              <AddSvg className="fill-white h-4 self-center" /> Create new Link
            </div>
          </Button> :
          <Button onClick={() => setQrModal(true)}>
            <div className="flex gap-1">
              <AddSvg className="fill-white h-4 self-center" /> Create new QR Code
            </div>
          </Button>
        }
      </div>
      <Modal
        title={"Create New Link"}
        setState={setCreateModal}
        state={createModal}>
        <CreateLink setCreateModal={setCreateModal} />
      </Modal>
      <Modal
        title={"Create a New QR Code"}
        setState={setQrModal}
        state={qrModal}>
        <QRForm setQrModal={setQrModal} />
      </Modal>
    </div>
  )
}