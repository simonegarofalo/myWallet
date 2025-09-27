import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLang = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("myWalletLang");
    const browserLang = navigator.language.split("-")[0];
    const initialLang = savedLang || browserLang || "en";
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("myWalletLang", lang);
  };

  return { switchLang };
};