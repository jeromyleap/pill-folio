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

const siteTitle = "nicheleap — Have a day.";
const siteDescription =
  "A weekly pill box for the work I keep close. Open a day to spill Jeromy Leap’s projects — The Memory Thread, Wristed, HealthScout, Fluxo, Peachy Clean, and more.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nicheleap.com"),
  title: {
    default: siteTitle,
    template: "%s · nicheleap",
  },
  description: siteDescription,
  applicationName: "nicheleap",
  authors: [{ name: "Jeromy Allen Leap", url: "https://nicheleap.com" }],
  creator: "Jeromy Allen Leap",
  publisher: "nicheleap",
  keywords: [
    "nicheleap",
    "Jeromy Leap",
    "portfolio",
    "The Memory Thread",
    "Wristed",
    "HealthScout",
    "Fluxo",
    "Peachy Clean",
    "pill planner",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: "A weekly pill box for the work I keep close.",
    url: "https://nicheleap.com",
    siteName: "nicheleap",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: "A weekly pill box for the work I keep close.",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3e6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#f3e6d4" },
  ],
  colorScheme: "light",
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
