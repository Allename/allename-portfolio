// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Script from "next/script";

// export default function CalendlyWidget() {
//   return (
//     <>
//       <link
//         href="https://assets.calendly.com/assets/external/widget.css"
//         rel="stylesheet"
//       />
//       <Script
//         src="https://assets.calendly.com/assets/external/widget.js"
//         strategy="afterInteractive"
//         onLoad={() => {
//           if ((window as any).Calendly) {
//             (window as any).Calendly.initBadgeWidget({
//               url: "https://calendly.com/allename-dev/30min",
//               text: "Book a call",
//               color: "#5e5d5d",
//               textColor: "#ffffff",
//               branding: false,
//             });
//           }
//         }}
//       />
//     </>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CalendarDays } from "lucide-react";
import Script from "next/script";
import { useCallback } from "react";

export default function CalendlyWidget() {
  const openCalendly = useCallback(() => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/allename-dev/30min",
      });
    }
  }, []);

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <button
        onClick={openCalendly}
        aria-label="Book a call"
        className="
          fixed bottom-5 right-5 z-[9999]
          flex items-center justify-center
          rounded-full bg-[#5e5d5d] text-white
          shadow-lg transition-all duration-200
          hover:scale-105 hover:bg-[#4f4e4e]
          h-14 w-14
          md:h-16 md:w-auto md:px-6 md:py-3 cursor-pointer
        "
      >
        {/* Mobile */}
        <CalendarDays className="h-6 w-6" />

        {/* Desktop */}
        {/* <span className="hidden md:block font-medium">
          Book a call
        </span> */}
      </button>
    </>
  );
}