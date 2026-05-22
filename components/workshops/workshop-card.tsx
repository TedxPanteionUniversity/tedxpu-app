import Link from "next/link";
import type { CSSProperties } from "react";
import type { Workshop } from "@/types/workshop";

type WorkshopCardProps = {
  workshop: Workshop;
  index: number;
};

const CARD_WIDTH = 318;
const CARD_HEIGHT = 318;
const FRAME_TOP_OFFSET = -8;

const titleStyle: CSSProperties = {
  fontSize: 31,
  fontWeight: 900,
  letterSpacing: 0,
  lineHeight: 1,
};

const detailStyle: CSSProperties = {
  fontSize: 27,
  fontWeight: 500,
  lineHeight: 1,
  marginTop: 13,
};

const registerStyle: CSSProperties = {
  bottom: 28,
  fontSize: 32,
  fontWeight: 900,
  left: 22,
  lineHeight: 1,
  position: "absolute",
  zIndex: 10,
};

const wineIconStyle: CSSProperties = {
  bottom: 22,
  height: 182,
  position: "absolute",
  right: -28,
  width: 182,
  zIndex: 5,
};

const flowerIconStyle: CSSProperties = {
  bottom: 2,
  height: 192,
  position: "absolute",
  right: -8,
  width: 192,
  zIndex: 5,
};

const cardStyles: CSSProperties[] = [
  {
    transform: "rotate(-1deg)",
  },
  {
    transform: "rotate(1deg)",
  },
  {
    transform: "rotate(-0.5deg)",
  },
];

function getCardStyle(index: number) {
  return cardStyles[index % cardStyles.length];
}

function HandDrawnFrame() {
  return (
    <svg
      className="pointer-events-none absolute left-0 w-full text-black"
      style={{
        height: `calc(100% + ${Math.abs(FRAME_TOP_OFFSET)}px)`,
        top: FRAME_TOP_OFFSET,
      }}
      viewBox="0 0 320 305"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M18 0C79 2 85 4 112 3C172 1 242 2 310 1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M310 1C304 54 306 91 311 132C315 166 307 206 314 249C317 267 315 284 318 296"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M308 298C236 302 175 291 143 298C101 301 58 303 20 299"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 299C13 237 10 183 11 126C11 80 13 43 9 11"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 10C11 92 6 171 13 243C16 266 14 282 20 300"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  );
}

export function WorkshopCard({ workshop, index }: WorkshopCardProps) {
  return (
    <article className="relative">
      <div
        className="relative overflow-visible bg-white pb-8 pl-5 pr-2 pt-5 shadow-none"
        style={{
          ...getCardStyle(index),
          height: CARD_HEIGHT,
          maxWidth: "100%",
          width: CARD_WIDTH,
        }}
      >
        <HandDrawnFrame />

        <div className="relative z-10 -mr-3 mt-0 max-w-[calc(100%+12px)] sm:mt-3">
          <h2 className="text-black" style={titleStyle}>
            {workshop.title}
          </h2>
          <p className="whitespace-nowrap text-black" style={detailStyle}>
            -by {workshop.facilitator}
          </p>
          <p className="whitespace-nowrap text-black" style={detailStyle}>
            -{workshop.time}
          </p>
          <p className="whitespace-nowrap text-black" style={detailStyle}>
            -{workshop.room}
          </p>
        </div>

        {index === 1 ? (
          <img
            src="/workshop/wine.svg"
            alt=""
            aria-hidden="true"
            style={wineIconStyle}
          />
        ) : null}

        {index === 0 ? (
          <img
            src="/workshop/flower.svg"
            alt=""
            aria-hidden="true"
            style={flowerIconStyle}
          />
        ) : null}

        <Link
          href={workshop.registerHref}
          aria-label={`Register for ${workshop.title}`}
          className="text-emerald-600 active:scale-95"
          style={registerStyle}
        >
          Register
        </Link>
      </div>
    </article>
  );
}
