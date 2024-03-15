'use client'

import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import CopySvg from "~/utils/CopySvg";
import DeleteSvg from "~/utils/DeleteSvg";
import EditSvg from "~/utils/EditSvg";

interface LinkProps {
  slug: string;
  description: string | null;
  id: number;
}


export default function Card({ slug, description, id }: LinkProps) {
  const [copyTooltip, setCopyTooltip] = useState(false);


  const copyToClipboard = async () => {
    try {
      setCopyTooltip(true);
      const copyLinkElement = document.getElementById(`copyLink${id}`);
      const textToCopy = copyLinkElement?.textContent ?? '';

      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    } finally {
      setTimeout(() => {
        setCopyTooltip(false);
      }, 900);
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
        <DeleteSvg className="hover:fill-dark-violet" />
      </div>
        <Transition appear show={copyTooltip} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setCopyTooltip}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          
            <div className="fixed inset-0 ">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="border border-white/10 max-w-md transform overflow-hidden rounded-2xl bg-dark-midnight p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white text-center"
                    >
                      Copied!
                    </Dialog.Title>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    </section>
  )
}