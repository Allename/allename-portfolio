import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CalendlyWidget from "@/components/CalendlyWidget"
import MusicWidget from "@/components/MusicWidget"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <head>
        <link rel="icon" href="/images/itachi-icon.jpg" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MusicWidget />
        <CalendlyWidget />
        <Analytics />
      </body>
    </html>
  )
}
