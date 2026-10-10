import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Swiftree Link-in-Bio",
  description: "Swiftree Link-in-Bio hub for vendors",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preload" href="/fonts/inter-4.1/InterVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
