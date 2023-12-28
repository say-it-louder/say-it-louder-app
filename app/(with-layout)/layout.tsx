import "@/app/ui/globals.css";
import { poppins } from "@/app/ui/fonts";
import { Providers } from "@/app/ui/provider";
import Navbar from "@/app/ui/navbar/navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
