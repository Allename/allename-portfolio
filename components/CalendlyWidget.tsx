/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Script from "next/script"

export default function CalendlyWidget() {
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).Calendly) {
            ;(window as any).Calendly.initBadgeWidget({
              url: "https://calendly.com/allename-dev/30min",
              text: "Book a call",
              color: "#5e5d5d",
              textColor: "#ffffff",
              branding: false,
            })
          }
        }}
      />
    </>
  )
}
