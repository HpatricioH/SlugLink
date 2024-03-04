'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from "next-auth/react"
import HamburgerSvg from "~/utils/HamburgerSvg";
import AddSvg from '~/utils/AddSvg';
import LogoutSvg from '~/utils/LogoutSvg';
import LinkSvg from '~/utils/LinkSvg';
import QrSvg from '~/utils/QrSvg';
import Link from 'next/link';
import Button from '~/utils/Button';
import { useLoadingSession } from '~/store/loadingSession';

const menuOptions = [
  {
    id: 'create',
    name: 'Create new link',
    href: '/create',
    component: AddSvg
  },
  {
    id: 'qrcode',
    name: 'Create new QR Code',
    href: '/qrcode',
    component: QrSvg
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    component: LinkSvg
  }
]

export default function MenuDropDown() {
  const { setLoading } = useLoadingSession()
  const menuItemClass = 'group flex w-full rounded-md items-center px-2 py-2 text-md text-white gap-2'

  const handleSingOut = async () => {
    try {
      setLoading(true)
      await signOut({ callbackUrl: '/'})
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Menu as={"div"} className="relative inline-block text-left">
      <Menu.Button className="flex justify-center items-center">
        <HamburgerSvg
          className='fill-white h-5 md:h-6 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-[0.08rem] hover:scale-110 hover:fill-dark-violet' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-64 divide-y divide-gray-100 border border-white/10 rounded-md bg-black/15 focus:outline-none">
          <div className="px-1 py-1 flex flex-col gap-1">

            {/* display the menu options */}

            {menuOptions.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={`${active && 'bg-white/10'
                      } ${menuItemClass}`}
                  >
                    <item.component className='fill-white h-5 w-5' />
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active }) => (
                <Button
                  onClick={handleSingOut}
                  className={`${active && 'bg-white/10'
                    } ${menuItemClass}`}>
                  <LogoutSvg className='fill-white h-5 w-5' />
                  Sign out
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}