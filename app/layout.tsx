import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SimplePrivyProvider } from "@/lib/privy/simple-privy-provider";

export const metadata: Metadata = {
  title: "Mobile Wallet App",
  description: "Export your private key securely",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SimplePrivyProvider>
          {children}
        </SimplePrivyProvider>
      </body>
    </html>
  );
}
