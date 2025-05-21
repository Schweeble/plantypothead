"use client";

import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";

// Adding Roboto font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
