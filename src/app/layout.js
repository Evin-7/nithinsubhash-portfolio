import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from "../components/SmoothScroll";

const manrope = localFont({
  src: "../assets/fonts/Manrope-Variable.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata = {
  title: "Nithin Subhash — UI/UX Designer",
  description:
    "Portfolio of Nithin Subhash, a UI/UX designer creating thoughtful digital experiences, product interfaces, and design systems",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${manrope.variable}`}>
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
