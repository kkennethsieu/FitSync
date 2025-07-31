import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "FitSync",
  description: "Workout Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
