import BenefitsBar from "@/components/layout/BenefitsBar";
import { Hero, FeaturedProducts, NatureCollection, WhyChooseUs, CustomPrintTeaser, HowItWorks, ShopByCategory, Sustainability, Testimonials, Newsletter } from "@/components/home/HomeSections";

export default function HomePage() {
  return <>
    <Hero />
    <BenefitsBar />
    <FeaturedProducts />
    <NatureCollection />
    <WhyChooseUs />
    <CustomPrintTeaser />
    <HowItWorks />
    <ShopByCategory />
    <Sustainability />
    <Testimonials />
    <Newsletter />
  </>;
}
