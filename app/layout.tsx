import type { Metadata } from "next";
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
      <head>
        <script src="https://cdn.jsdelivr.net/pyodide/v0.29.1/full/pyodide.js"></script>
      </head>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
