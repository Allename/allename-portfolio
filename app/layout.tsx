import type { Metadata } from "next"
import { Geist, Geist_Mono, Shippori_Mincho_B1 } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CalendlyWidget from "@/components/CalendlyWidget"
import MusicWidget from "@/components/MusicWidget"
import KunaiCursor from "@/components/KunaiCursor"
import { Analytics } from "@vercel/analytics/next"
import LoadingScreen from "@/components/LoadingScreen"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const mincho = Shippori_Mincho_B1({
  variable: "--font-mincho",
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Allename Anthony | Frontend Engineer",
  description:
    "Frontend engineer based in Lagos, Nigeria. Building things that live on the internet.",
  icons: {
    icon: "/itachi-icon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mincho.variable} dark`}
    >
      <head>
        <link rel="icon" href="/images/itachi-icon.jpg" />
      </head>
      <body className="grain min-h-screen flex flex-col">
        {/* Set before first paint so the preloader can hide everything until ready */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-loading','true')",
          }}
        />
        <Navbar />
        <main className="site-content flex-1">{children}</main>
        <Footer />
        <MusicWidget />
        <CalendlyWidget />
        <KunaiCursor />
        <LoadingScreen />
        <Analytics />
      </body>
    </html>
  )
}
