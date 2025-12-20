import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { ColorModeScript } from '@chakra-ui/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* Chakra UI ColorModeScript garante que o modo de cor inicial seja consistente */}
        <ColorModeScript initialColorMode="light" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
