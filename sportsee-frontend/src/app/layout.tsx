import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./providers/UserContext";

/**
 * Roboto font configuration for the application.
 * @constant
 */
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Metadata for the application.
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "SportSee-frontend",
  description: "Sport Analytics Dashboard",
};

/**
 * RootLayout component - The root layout for the entire application.
 *
 * This component wraps the entire application and provides:
 * - HTML structure with language set to English
 * - Antialiasing for smoother text rendering
 * - UserProvider for global user context
 * - Roboto font applied to the body
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The rendered RootLayout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="antialiased">
        <UserProvider>
          <body className={roboto.className}>{children}</body>
        </UserProvider>
      </html>
    </>
  );
}
