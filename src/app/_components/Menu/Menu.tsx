'use client'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import HamburgerSvg from "~/utils/HamburgerSvg";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <HamburgerSvg
        className='fill-white h-5 md:h-6 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-[0.08rem] hover:scale-110 hover:fill-[hsl(280,100%,70%)]'
        onClick={() => setIsOpen(true)} />
      <Transition show={isOpen} as={Fragment} >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="absolute top-0 mt-[3rem] right-[2rem] mx-auto max-w-sm rounded-2xl border border-white/10 bg-dark-midnight text-white p-6">
              <Dialog.Title>Complete your order</Dialog.Title>
              <p>create new link</p>
              <p>dashboard</p>
              <p>logout</p>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>

  )
}