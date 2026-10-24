import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
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
      className={`${nunito.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
