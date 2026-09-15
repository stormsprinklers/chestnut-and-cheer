import Image from "next/image";

export type ProfessionalPhoto = {
  src: string;
  alt: string;
};

export function ProfessionalPhotoGallery({
  eyebrow,
  title,
  description,
  photos,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  photos: ProfessionalPhoto[];
}) {
  return (
    <section className="section-pad below-fold bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 font-display text-3xl font-bold text-chestnut sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 leading-relaxed text-chestnut/70">{description}</p>
        </div>
        <div className="mt-8 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`relative overflow-hidden rounded-2xl bg-cream ${index === 0 || index === 5 ? "sm:col-span-2" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
