import "@/app/ui/globals.css";
import { poppins } from "@/app/ui/fonts";
import { Providers } from "@/app/ui/provider";
import Navbar from "@/app/ui/navbar/navbar";
import FooterSide from "@/app/ui/footerSide";

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
          <main className="grid md:grid-cols-3 lg:grid-cols-4">
            <section className="hidden md:block">
              <FooterSide />
            </section>
            <section className="col-span-2">{children}</section>
            <section className=""></section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
