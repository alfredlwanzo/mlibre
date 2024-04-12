import type { Metadata } from "next";
import { Alata } from "next/font/google";
import "@/styles/globals.css";
import "@blocknote/react/style.css";
import { ThemeProvider } from "@/components/theme-provider";

const alata = Alata({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mavoix.cd | Le Média libre d'accès",
  description:
    "MAVOIX.CD est un Média en accès libre qui fourni de l'information réelle aux citoyens pour l'interet général en République Démocratique du Congo",
  keywords: [
    "mavoix",
    "mavoix.cd",
    "Ma voix",
    "Média libre",
    "Média en accès libre",
    "Média independant",
    "information libre",
    "RDC",
    "DRC",
    "Congo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={alata.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
