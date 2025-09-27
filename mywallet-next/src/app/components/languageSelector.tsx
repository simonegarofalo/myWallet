'use client';

import { useTranslation } from 'react-i18next';
import Image from "next/image"

export default function LanguageSelector() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: 'en' | 'it') => {
        i18n.changeLanguage(lang);
    }

    return(
        <div className="language-wrapper">
        <p>{t('buttons.languageSelection')}</p>
        <div className="lang-wrapper">
          <Image
            src="/icons/uk.png"
            alt="uk-lang"
            id="lang-en"
            className="lang-flag"
            width={40} height={40}
            onClick={() => changeLanguage('en')}
          />
          <Image
            src="/icons/it.png"
            alt="ita-lang"
            id="lang-it"
            className="lang-flag"
            width={40} height={40}
            onClick={() => changeLanguage('it')}
          />
        </div>
      </div>
    )
}