import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { auth } from "@/auth";
import { ModalProvider } from "@/providers/modal-provider";
import { AppKnockProviders } from "@/providers/knock-provider";
import { WebPushProvider } from "@/providers/web-push-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shams Publication",
  description: "Best Law Books vendor in Bangladesh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <AppKnockProviders userId={session?.userId}>
              <QueryProvider>
                {children}
                <Toaster />
                <ModalProvider />
                <NextTopLoader showSpinner={false} />
              </QueryProvider>
            </AppKnockProviders>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
