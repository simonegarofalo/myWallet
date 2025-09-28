import type { Metadata } from "next";
import "./globals.css";

import I18nProvider from './providers/i18nProvider';
import { TransactionsProvider } from "./context/transactionsContext";
import { ThemeProvider } from "./context/themeContext";

export const metadata: Metadata = {
  title: "myWallet | The easiest way to track your finance",
  description: "A simple web application to track your income and expenses easily",
  icons: {
    icon: [
      { url: "/favicon_myWallet_32X32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_myWallet_16X16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <I18nProvider>
        <TransactionsProvider>
          <ThemeProvider>
          {children}
          </ThemeProvider>
          </TransactionsProvider>
        </I18nProvider>      
        </body>
    </html>
  );
}
