"use client";

import ThemeRegistry from "@/components/ThemeRegistry";
import { Navbar } from "@/components/nav";

// Adding Roboto font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <Navbar />
            <main>{children}</main>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
