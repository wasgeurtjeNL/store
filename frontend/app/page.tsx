import HowWorks from "@/components/home/HowWorks";
import OurStory from "@/components/home/OurStory";
import ShopCategories from "@/components/home/ShopCategories";
import Sustainability from "@/components/home/Sustainability";
import Testimonials from "@/components/home/Testimonials";
import USPs from "@/components/home/USPs";
import WashPointProgram from "@/components/home/WashPointProgram";

export default function Home() {
  return (
    <main>
      <ShopCategories />
      <USPs />
      <Testimonials />
      <HowWorks />
      <Sustainability />
      <WashPointProgram />
      <OurStory />
    </main>
  );
}
