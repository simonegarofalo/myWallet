'use client';

import { useLang } from '../hooks/useLang';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const { switchLang } = useLang();

  return (
    <div className="language-wrapper">
      <p>{t('buttons.languageSelection')}</p>
      <div className="lang-wrapper">
        <Image
          src="/icons/uk.png"
          alt="uk-lang"
          className="lang-flag"
          width={40}
          height={40}
          onClick={() => switchLang('en')}
        />
        <Image
          src="/icons/it.png"
          alt="ita-lang"
          className="lang-flag"
          width={40}
          height={40}
          onClick={() => switchLang('it')}
        />
      </div>
    </div>
  );
}