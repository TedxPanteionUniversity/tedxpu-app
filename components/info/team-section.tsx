import Image from "next/image";
import { teamGroups } from "@/lib/info-data";

type Decoration = {
  src: string;
  width: number;
  height: number;
  className: string;
};

type TeamVisual = {
  drawingFrameSize: string;
  photoSize: string;
  imageSizes: string;
  decoration?: Decoration;
};

const DEFAULT_VISUAL: TeamVisual = {
  drawingFrameSize: "w-screen max-w-[520px]",
  photoSize: "w-[120vw] sm:w-screen sm:max-w-[520px]",
  imageSizes: "(max-width: 430px) 120vw, 520px",
};

const TEAM_VISUALS: Record<string, TeamVisual> = {
  curation: {
    drawingFrameSize: "w-[calc(100vw-12px)] max-w-[420px]",
    photoSize: "w-[110vw] sm:w-[calc(100vw-12px)] sm:max-w-[420px]",
    imageSizes: "(max-width: 430px) 110vw, 420px",
    decoration: {
      src: "/team/flower.svg",
      width: 464,
      height: 612,
      className: "absolute -bottom-28 right-2 z-10 h-auto w-34",
    },
  },
  graphs: {
    drawingFrameSize: "w-screen max-w-[600px]",
    photoSize: "w-[140vw] sm:w-screen sm:max-w-[600px]",
    imageSizes: "(max-width: 430px) 140vw, 600px",
    decoration: {
      src: "/team/pencil.svg",
      width: 686,
      height: 936,
      className: "absolute -bottom-20 left-2 z-10 h-auto w-38",
    },
  },
  mark: {
    drawingFrameSize: "w-screen max-w-[600px]",
    photoSize: "w-[140vw] sm:w-screen sm:max-w-[600px]",
    imageSizes: "(max-width: 430px) 140vw, 600px",
    decoration: {
      src: "/team/star.svg",
      width: 848,
      height: 896,
      className: "absolute -bottom-14 z-10 h-auto w-42",
    },
  },
  exp: {
    drawingFrameSize: "w-screen max-w-[560px]",
    photoSize: "w-[140vw] sm:w-screen sm:max-w-[560px]",
    imageSizes: "(max-width: 430px) 140vw, 560px",
    decoration: {
      src: "/team/sun.svg",
      width: 848,
      height: 896,
      className: "absolute -bottom-22 right-4 z-10 h-auto w-38",
    },
  },
  speakers: {
    drawingFrameSize: "w-screen max-w-[660px]",
    photoSize: "w-[150vw] sm:w-screen sm:max-w-[660px]",
    imageSizes: "(max-width: 430px) 150vw, 660px",
    decoration: {
      src: "/team/plant.svg",
      width: 725,
      height: 903,
      className: "absolute -bottom-18 -left-8 z-10 h-auto w-40",
    },
  },
  spons: {
    drawingFrameSize: "w-screen max-w-[560px]",
    photoSize: "w-[140vw] sm:w-screen sm:max-w-[560px]",
    imageSizes: "(max-width: 430px) 140vw, 560px",
    decoration: {
      src: "/team/flower2.svg",
      width: 1082,
      height: 996,
      className: "absolute -bottom-18 -right-10 z-10 h-auto w-44",
    },
  },
};

function getTeamVisual(slug: string) {
  return TEAM_VISUALS[slug] ?? DEFAULT_VISUAL;
}

export function TeamSection() {
  return (
    <section className="overflow-hidden px-6 pb-24 pt-3">
      <h2 className="mb-4 text-[26px] font-semibold leading-none tracking-normal text-black">
        Meet the Team
      </h2>

      <div className="space-y-1">
        {teamGroups.map((group, index) => {
          const { decoration, drawingFrameSize, imageSizes, photoSize } =
            getTeamVisual(group.slug);
          const isFirstGroup = index === 0;

          return (
            <article
              key={group.slug}
              className={isFirstGroup ? "pt-1 text-center" : "mt-10 text-center"}
            >
              <div
                className={`relative left-1/2 aspect-[1.42/1] -translate-x-1/2 ${photoSize}`}
              >
                <Image
                  src={group.image}
                  alt={`${group.name} photo group`}
                  fill
                  className="object-contain"
                  sizes={imageSizes}
                  quality={72}
                  preload={isFirstGroup}
                />

                <div
                  className={`pointer-events-none absolute left-1/2 top-0 aspect-[1.42/1] -translate-x-1/2 ${drawingFrameSize}`}
                >
                  {decoration ? (
                    <img
                      src={decoration.src}
                      width={decoration.width}
                      height={decoration.height}
                      className={decoration.className}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
              </div>

              <div className="mx-auto mt-2 max-w-[88%] text-center text-[11px] leading-snug text-black">
                <p className="font-medium italic">{group.name}</p>
                <p className="mt-0.5">
                  {group.members.map((member, memberIndex) => (
                    <span
                      key={member.name}
                      className={member.director ? "font-semibold" : undefined}
                    >
                      {member.name}
                      {memberIndex < group.members.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
