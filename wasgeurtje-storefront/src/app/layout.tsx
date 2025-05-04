import { getBaseURL } from "@lib/util/env"
import Footer from "components/shared/Footer"
import Navbar from "components/shared/Navbar"
import NavTopNotify from "components/shared/NavTopNotify"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* <NavTopNotify />
        <Navbar /> */}
        <main className="relative">{props.children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
