import Banners from "@/components/Banners";
import Beatssection from "@/components/Beatssection";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      {/* <Navbar href="liked"/> */}
      <Hero />
      <Beatssection
        href="topcharts"
        navigate="See more"
        title="Trending Tracks"
      />
      <Banners/>
      <Beatssection
        href="genres"
        navigate="See more"
        title="Popular Genres"
      />
      <Footer/>
    </>
  );
}
