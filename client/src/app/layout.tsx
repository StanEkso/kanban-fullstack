import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import ModalRoot from "@/components/modal/ModalRoot";
import Header from "@/components/layout/Header";
import colors from "@/styles/colors.module.scss";

export const metadata = {
  title: "Kanban",
  description: "Generated by create next app",
};

const inter = Inter({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={colors}>
        <main className="root__wrapper">
          <Providers>
            <Header />
            {children}
            <ModalRoot />
          </Providers>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
