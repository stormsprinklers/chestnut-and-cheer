import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BookingProcess } from "@/components/sections/BookingProcess";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { BookingPlaceholder } from "@/components/sections/BookingPlaceholder";

const BeforeAfter = dynamic(
  () =>
    import("@/components/sections/BeforeAfter").then((m) => ({
      default: m.BeforeAfter,
    })),
  { loading: () => <div className="section-pad" aria-hidden /> },
);

const Countdown = dynamic(
  () =>
    import("@/components/sections/Countdown").then((m) => ({
      default: m.Countdown,
    })),
  { loading: () => <div className="section-pad" aria-hidden /> },
);

const FAQs = dynamic(
  () =>
    import("@/components/sections/FAQs").then((m) => ({ default: m.FAQs })),
  { loading: () => <div className="section-pad" aria-hidden /> },
);

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
