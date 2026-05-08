import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "CRM Pro - Lead Management System",
  description: "Professional CRM for managing sales leads and pipeline",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
