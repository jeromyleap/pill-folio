import type { Metadata, Viewport } from "next";
import { Fredoka, Geist, Great_Vibes, Inter, Nunito, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700", "800"],
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
  preload: false,
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicheleap.com"),
  title: "nicheleap — open a day",
  description:
    "Jeromy's weekly pill planner. Sunday through Saturday: education, The Memory Thread, Wristed, HealthScout, Fluxo, Peachy Clean, and a Saturday about page.",
  openGraph: {
    title: "nicheleap",
    description: "A weekly pill planner for projects in rotation.",
    url: "https://nicheleap.com",
    siteName: "nicheleap",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3e6d4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} ${outfit.variable} ${inter.variable} ${playfair.variable} ${greatVibes.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
