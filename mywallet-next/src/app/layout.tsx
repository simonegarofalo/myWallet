import type { Metadata } from "next";
import "./globals.css";

import I18nProvider from './providers/i18nProvider';
import { TransactionsProvider } from "./context/transactionsContext";

export const metadata: Metadata = {
  title: "myWallet | The easiest way to track your finance",
  description: "A simple web application to track your income and expenses easily",
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
          {children}
          </TransactionsProvider>
        </I18nProvider>      
        </body>
    </html>
  );
}
