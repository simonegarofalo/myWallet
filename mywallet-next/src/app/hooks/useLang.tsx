import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLang = () => {
  const { i18n } = useTranslation();

  // Stato per sapere quando la lingua è pronta
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prendi la lingua salvata o usa "en" come default
    const savedLang = localStorage.getItem("myWalletLang") || "en";

    // Cambia lingua solo se diversa da quella corrente
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang).then(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, [i18n]);

  // Funzione per cambiare lingua e salvarla
  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("myWalletLang", lang);
  };

  return { switchLang, isReady };
};
