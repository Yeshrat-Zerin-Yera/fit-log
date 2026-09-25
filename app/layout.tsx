import type { Metadata } from "next";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout library and fitness planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}
        </FitLogProvider>
      </body>
    </html>
  );
}