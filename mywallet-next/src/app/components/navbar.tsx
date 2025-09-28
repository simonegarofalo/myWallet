'use client';

import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import Image from "next/image"
import Notifications from "./notifications";
import Settings from "./settings"


export default function Navbar() {
  const { theme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState (false);
  const [openNotifications, setOpenNotifications] = useState(false)
  const [supportsHover, setSupportsHover] = useState(false);
  
  useEffect(() => {
    if(typeof window !== "undefined") {
      setSupportsHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const logo = theme === 'light' ? '/light-mode-logo.svg' : '/dark-mode-logo.svg';

  
  return (
  <header>
    <nav>
      <div className="logo-wrapper">
        <Image src={logo} alt="myWallet-logo" width={60} height={60} />
        </div>
        <div className="icons-wrapper">
          <div id="notifications-icon" className="icon-container notifications"
          onClick={() => !supportsHover && setOpenNotifications(!openNotifications)}
          onMouseEnter={() => supportsHover && setOpenNotifications(true)}
          onMouseLeave={() => supportsHover && setOpenNotifications(false)}>
            <Image
              src="/icons/dark-mode-notification.svg"
              alt="notifications-icon"
              width={40} height={40}
            />
            <div className="green-circle">
              <div className="pulsing green-circle-shadow"></div>
            </div>
          </div>
          <Notifications 
          open={openNotifications}
          setOpen={setOpenNotifications} 
          supportsHover={supportsHover} />
          <div id="settings-icon" className="icon-container" onClick={() => setIsSettingsOpen(true)}>
            <Image
              src="/icons/dark-mode-settings.svg"
              alt="settings-icon"
              width={40} height={40}
            />
          </div>
          <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    </nav>
  </header>
    )
}