import React from "react"
import { Header } from "../_layouts/header"

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
