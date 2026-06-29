import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { BookingProcess } from "@/components/sections/BookingProcess";
import { Countdown } from "@/components/sections/Countdown";
import { Reviews } from "@/components/sections/Reviews";
import { FAQs } from "@/components/sections/FAQs";
import { Contact } from "@/components/sections/Contact";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { BookingPlaceholder } from "@/components/sections/BookingPlaceholder";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ServicesOverview />
      <WhyChooseUs />
      <BeforeAfter />
      <BookingProcess />
      <BookingPlaceholder />
      <Countdown />
      <Reviews />
      <FAQs />
      <Contact />
      <ServiceAreaMap />
    </>
  );
}
