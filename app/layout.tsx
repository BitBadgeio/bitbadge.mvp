import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitbadge",
  description: "Learn Python coding with interactive tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.29.1/full/pyodide.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
