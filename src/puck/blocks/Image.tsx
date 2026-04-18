import NextImage from "next/image";

export type ImageProps = {
  src: string;
  alt: string;
  width: "contained" | "full";
  ratio: "16:9" | "4:3" | "1:1" | "3:4";
  tone: "cream" | "dark";
};

const SAFE_IMAGE_HOST_PATTERN = /^https:\/\/([a-z0-9-]+\.)?(sanity\.io|cdninstagram\.com|behold\.so)(:\d+)?\//i;

const ratioClasses: Record<ImageProps["ratio"], string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "3:4": "aspect-[3/4]",
};

const toneClasses: Record<ImageProps["tone"], string> = {
  cream: "bg-cream",
  dark: "bg-dark",
};

export function Image({ src, alt, width, ratio, tone }: ImageProps) {
  if (!src) {
    return (
      <section className={`${toneClasses[tone]} px-6 py-12`}>
        <div className="max-w-3xl mx-auto text-center opacity-60 border-2 border-dashed border-dark p-10">
          Add an image URL to display here.
        </div>
      </section>
    );
  }

  const useNextImage = SAFE_IMAGE_HOST_PATTERN.test(src);
  const image = (
    <div
      className={`${ratioClasses[ratio]} relative overflow-hidden border-2 border-dark bg-cream`}
    >
      {useNextImage ? (
        <NextImage
          src={src}
          alt={alt || ""}
          fill
          sizes={width === "full" ? "100vw" : "(min-width: 1024px) 1024px, 100vw"}
          className="object-cover"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );

  return (
    <section className={`${toneClasses[tone]} px-6 py-12`}>
      {width === "full" ? (
        image
      ) : (
        <div className="max-w-5xl mx-auto">{image}</div>
      )}
    </section>
  );
}
