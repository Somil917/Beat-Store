import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import Beatssection from "@/components/Beatssection";
import ToasterProvider from "@/providers/ToasterProvider";
import Player from "@/components/Player";
import NextTopLoader from "nextjs-toploader";
import Banners from "@/components/Banners";
import Footer from "@/components/Footer";
import getLikedBeats from "@/actions/getLikedBeats";
import { useRouter } from "next/router";
import NavBarWrapper from "@/components/NavbarWrapper";
import { FormProvider } from "@/providers/FormProvider";
import { usePathname } from "next/navigation";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getCartItems from "@/actions/getCartItems";
import LikedBeatsProvider from "@/providers/LikedBeatsProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeatStore",
  description: "Elevate your music career",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getActiveProductsWithPrices();
  const cartItems = await getCartItems();

  return (
    <html lang="en">
      <body className={font.className}>
        <NextTopLoader />
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <FormProvider>
              <LikedBeatsProvider />
              <NavBarWrapper cartItems={cartItems} />
              {/* <Hero /> */}
              {children}
              {/* <Beatssection href="topcharts" title="Top Generes" navigate="See More"/> */}
              {/* <Beatssection/> */}
              <Player />
            </FormProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
