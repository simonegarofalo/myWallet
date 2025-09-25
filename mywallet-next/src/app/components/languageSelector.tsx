import Image from "next/image"

export default function LanguageSelector() {
    return(
        <div className="language-wrapper">
        <p data-key="buttons.languageSelection">Choose your language</p>
        <div className="lang-wrapper">
          <Image
            src="/icons/uk.png"
            alt="uk-lang"
            id="lang-en"
            className="lang-flag"
            width={40} height={40}
          />
          <Image
            src="/icons/it.png"
            alt="ita-lang"
            id="lang-it"
            className="lang-flag"
            width={40} height={40}
          />
        </div>
      </div>
    )
}