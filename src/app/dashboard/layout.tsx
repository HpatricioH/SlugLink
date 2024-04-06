'use client'

import ActionBar from "../_components/ActionBar/ActionBar";
import Navbar from "../_components/Navbar/Navnar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  return (
    <section className="h-[calc(100vh-8rem)] transition-all duration-100 bg-dark-midnight text-white z-10">
      <div className="flex flex-col gap-5 container m-auto px-4">
        <Navbar />
        <ActionBar />
        {children}
      </div>
    </section>
  )
}