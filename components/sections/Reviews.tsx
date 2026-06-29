import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";

export function Reviews() {
  return (
    <section id="reviews" className="section-pad below-fold bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
            Real Utah homeowners and property managers trust Chestnut & Cheer
            every season.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="flex flex-col overflow-hidden rounded-2xl border border-chestnut/10 bg-white shadow-sm"
            >
              <div className="flex justify-center border-b border-chestnut/5 bg-white">
                <Image
                  src={testimonial.starsImage}
                  alt="5 star rating"
                  width={208}
                  height={42}
                  className="h-[2.625rem] w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="flex-1 text-sm leading-relaxed text-chestnut/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-chestnut/5 pt-4">
                  <div className="font-semibold text-chestnut">{testimonial.author}</div>
                  <div className="text-sm text-chestnut/60">{testimonial.location}</div>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
