"use client"

import Image from "next/image"
import Link from "next/link"

type NotificationsProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  supportsHover: boolean;
};

export default function Notifications({ open, setOpen, supportsHover }: NotificationsProps) {
  return (
    <div
      id="updates-box"
      className={`updates-box ${open ? "" : "obscure"}`}
      onMouseEnter={() => supportsHover && setOpen(true)}
      onMouseLeave={() => supportsHover && setOpen(false)}
    >
      <p data-key="newsMessage.githubLink"></p>
      <div className="green-circle">
        <div className="pulsing green-circle-shadow"></div>
      </div>
      <div className="github-wrapper">
        <Image
          src="/icons/github-icon.svg"
          alt="github-icon"
          width={20}
          height={20}
        />
        <Link href="https://github.com/simonegarofalo/myWallet">
          https://github.com/simonegarofalo/myWallet
        </Link>
      </div>
    </div>
  )
}