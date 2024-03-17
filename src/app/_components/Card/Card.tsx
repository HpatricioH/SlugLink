'use client'

import { useState } from "react";
import CopySvg from "~/utils/CopySvg";
import DeleteSvg from "~/utils/DeleteSvg";
import EditSvg from "~/utils/EditSvg";
import Modal from "~/ui/Modal";

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
      }, 1200);
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
      <Modal 
        title="Link Copied!" 
        copyTooltip={copyTooltip} 
        setCopyTooltip={setCopyTooltip}
      />
    </section>
  )
}