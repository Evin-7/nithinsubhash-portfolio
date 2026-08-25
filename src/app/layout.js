import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

export const metadata = {
  title: "Nithin Subhash — UI/UX Designer",
  description:
    "Portfolio of Nithin Subhash, a UI/UX designer creating thoughtful digital experiences, product interfaces, and design systems.",
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
    <html lang="en">
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
