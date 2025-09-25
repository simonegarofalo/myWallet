"use client";

import Image from "next/image"
import languageSelector from "./languageSelector";
import LanguageSelector from "./languageSelector";

export default function Settings({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <div className={`settings-menu ${ isOpen ? "" : "hidden"}`}>
        <div className="main-menu-wrapper">
          <div id="return-icon" className="icon-container" onClick={onClose}>
            <Image
              src="/icons/arrow-back-dark-mode.svg"
              alt="arrow-back-icon"
              width={40} height={40}
            />
          </div>
        </div>
        <LanguageSelector />
        <Image
          src="/dark-mode-logo.svg"
          alt="myWallet-logo"
          className="secondary-logo"
          width={40} height={40}
        />
      </div>
    )
}