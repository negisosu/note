import { Geist, Geist_Mono, Zen_Kurenaido } from "next/font/google"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const zenKurenaido = Zen_Kurenaido({
  variable: "--font-zen-kurenaido",
  weight: "400",
  subsets: ["latin"],
})
