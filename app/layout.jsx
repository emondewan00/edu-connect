import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, poppins.variable)}>
        <AuthProvider>
          {children}

          <Toaster richColors position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
