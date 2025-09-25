import Image from "next/image"

export default function Navbar() {
    return (
        <header>
      <nav>
        <div className="logo-wrapper">
          <Image src="/dark-mode-logo.svg" alt="myWallet-logo" width={40} height={40} />
        </div>
        <div className="icons-wrapper">
          <div id="notifications-icon" className="icon-container news">
            <Image
              src="/icons/dark-mode-notification.svg"
              alt="notifications-icon"
              width={40} height={40}
            />
            <div className="green-circle">
              <div className="pulsing green-circle-shadow"></div>
            </div>
          </div>
          <div id="settings-icon" className="icon-container">
            <Image
              src="/icons/dark-mode-settings.svg"
              alt="settings-icon"
              width={40} height={40}
            />
          </div>
        </div>
      </nav>
    </header>
    )
}