import "@/app/ui/globals.css";
import { poppins } from "./ui/fonts";
import { Providers } from "./ui/provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
