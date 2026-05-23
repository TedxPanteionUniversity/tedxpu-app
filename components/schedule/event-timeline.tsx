"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { timelineEvents, eventIcons } from "@/lib/schedule-data";
import { speakers } from "@/lib/speaker-data";
import { TimelineEvent } from "@/types/schedule";
import { cn } from "@/lib/utils";

const EVENT_TIME_ZONE = "Europe/Athens";
const EVENT_DATE = {
  year: 2026,
  month: 5,
  day: 23,
};
const SCHEDULE_DELAY_NOTE = "";

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getAthensTimeParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const valueFor = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: valueFor("year"),
    month: valueFor("month"),
    day: valueFor("day"),
    minutes: valueFor("hour") * 60 + valueFor("minute"),
  };
}

function isEventDate(date: Date) {
  const athensNow = getAthensTimeParts(date);

  return (
    athensNow.year === EVENT_DATE.year &&
    athensNow.month === EVENT_DATE.month &&
    athensNow.day === EVENT_DATE.day
  );
}

function findActiveEvent(date: Date) {
  if (!isEventDate(date)) {
    return null;
  }

  const { minutes } = getAthensTimeParts(date);
  const matchingEvents = timelineEvents.filter((event) => {
    if (!event.endTime) {
      return false;
    }

    const startsAt = parseTimeToMinutes(event.time);
    const endsAt = parseTimeToMinutes(event.endTime);

    return minutes >= startsAt && minutes < endsAt;
  });

  if (matchingEvents.length === 0) {
    return null;
  }

  return matchingEvents.find((event) => !event.isSectionHeader) ?? matchingEvents[0];
}

const speakersByEventId = new Map(speakers.map((speaker) => [speaker.id, speaker]));

function getSpeakerForEvent(event: TimelineEvent) {
  const directMatch = speakersByEventId.get(event.id);

  if (directMatch) {
    return directMatch;
  }

  if (event.title === "Αλίκη Συνατσάκη" && event.description === "Hostess") {
    return speakersByEventId.get("session-host-aliki");
  }

  return undefined;
}

const sketchRotations = [
  -2,
  1,
  -1,
  2,
  0,
];

function getSketchRotation(index: number) {
  return sketchRotations[index % sketchRotations.length];
}

const eventTypeStyles: Record<
  TimelineEvent["type"],
  {
    ink: string;
    paper: string;
    shadow: string;
  }
> = {
  registration: {
    ink: "#111827",
    paper: "#f9fafb",
    shadow: "rgba(17, 24, 39, 0.18)",
  },
  ceremony: {
    ink: "#2563eb",
    paper: "#eff6ff",
    shadow: "rgba(37, 99, 235, 0.18)",
  },
  talk: {
    ink: "#d97706",
    paper: "#fffbeb",
    shadow: "rgba(217, 119, 6, 0.2)",
  },
  break: {
    ink: "#059669",
    paper: "#ecfdf5",
    shadow: "rgba(5, 150, 105, 0.18)",
  },
  workshop: {
    ink: "#7c3aed",
    paper: "#f5f3ff",
    shadow: "rgba(124, 58, 237, 0.18)",
  },
  performance: {
    ink: "#db2777",
    paper: "#fdf2f8",
    shadow: "rgba(219, 39, 119, 0.18)",
  },
};

function getEventTypeStyle(type: TimelineEvent["type"]) {
  return eventTypeStyles[type];
}

function getMarkerStyle(
  index: number,
  isActive: boolean,
  type: TimelineEvent["type"]
): CSSProperties {
  const typeStyle = getEventTypeStyle(type);

  return {
    alignItems: "center",
    backgroundColor: isActive ? typeStyle.paper : "#ffffff",
    border: `3px solid ${typeStyle.ink}`,
    borderRadius: "52% 48% 45% 55% / 46% 58% 42% 54%",
    boxShadow: isActive
      ? `2px 3px 0 ${typeStyle.shadow}`
      : "1px 2px 0 rgba(0, 0, 0, 0.08)",
    color: typeStyle.ink,
    display: "flex",
    height: 48,
    justifyContent: "center",
    transform: `rotate(${getSketchRotation(index)}deg)`,
    width: 52,
  };
}

function getConnectorStyle(index: number, type: TimelineEvent["type"]): CSSProperties {
  const typeStyle = getEventTypeStyle(type);

  return {
    backgroundColor: typeStyle.ink,
    borderRadius: 999,
    bottom: -34,
    left: "50%",
    position: "absolute",
    top: 50,
    transform: `translateX(-50%) rotate(${index % 2 === 0 ? -1 : 1}deg)`,
    width: 3,
  };
}

function getActiveAccentStyle(type: TimelineEvent["type"]): CSSProperties {
  return {
    backgroundColor: getEventTypeStyle(type).ink,
  };
}

function getActiveContentStyle(type: TimelineEvent["type"]): CSSProperties {
  const typeStyle = getEventTypeStyle(type);

  return {
    backgroundColor: typeStyle.paper,
    boxShadow: `0 0 0 2px ${typeStyle.shadow}`,
  };
}

function ScheduleMarkerIcon({ type }: { type: TimelineEvent["type"] }) {
  const icon = eventIcons[type];

  if (icon.kind === "image") {
    return (
      <img
        src={icon.src}
        alt=""
        aria-hidden="true"
        className="h-9 max-w-8 object-contain"
      />
    );
  }

  const Icon = icon.Icon;

  return <Icon className="h-5 w-5 stroke-[2.4]" />;
}

function getLegendStyle(type: TimelineEvent["type"]): CSSProperties {
  const typeStyle = getEventTypeStyle(type);

  return {
    backgroundColor: typeStyle.paper,
    borderColor: typeStyle.ink,
    color: typeStyle.ink,
  };
}

const headerStyle: CSSProperties = {
  marginBottom: 16,
};

const timelineStyle: CSSProperties = {
  paddingTop: 10,
};

const timelineRowStyle: CSSProperties = {
  minHeight: 112,
  paddingBottom: 40,
};

export function EventTimeline() {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const eventRefs = useRef(new Map<string, HTMLDivElement>());
  const hasScrolledToActiveEvent = useRef(false);

  const scrollToEvent = useCallback((eventId: string) => {
    const eventElement = eventRefs.current.get(eventId);

    if (!eventElement) {
      return;
    }

    eventElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  useEffect(() => {
    const updateActiveEvent = () => {
      setActiveEvent(findActiveEvent(new Date()));
    };

    updateActiveEvent();
    const intervalId = window.setInterval(updateActiveEvent, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!activeEvent || hasScrolledToActiveEvent.current) {
      return;
    }

    hasScrolledToActiveEvent.current = true;
    window.requestAnimationFrame(() => scrollToEvent(activeEvent.id));
  }, [activeEvent, scrollToEvent]);

  return (
    <div className="px-4 py-6 text-black">
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-3xl font-black leading-none tracking-normal text-black">
          Schedule
        </h1>
        <p className="mt-2 text-sm font-medium text-neutral-500">
          Saturday, May 23, 2026
        </p>
        {activeEvent && (
          <button
            type="button"
            onClick={() => scrollToEvent(activeEvent.id)}
            className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-left text-xs font-semibold text-red-600 shadow-sm active:scale-[0.98]"
            aria-label={`Scroll to current schedule event: ${activeEvent.title}`}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
            <span className="shrink-0">Now:</span>
            <span className="min-w-0 truncate">{activeEvent.title}</span>
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="relative" style={timelineStyle}>
        <div>
          {timelineEvents.map((event, index) => {
            const isLast = index === timelineEvents.length - 1;
            const isActive = activeEvent?.id === event.id;
            const showDelayNote = index > 0;
            const speaker = getSpeakerForEvent(event);
            const hasExpandableWorkshopDescription =
              event.type === "workshop" && Boolean(event.description);
            const canExpand = Boolean(speaker?.bio) || hasExpandableWorkshopDescription;
            const isExpanded = expandedEventId === event.id;
            const toggleExpandedEvent = () =>
              setExpandedEventId(isExpanded ? null : event.id);
            const expandableLabel = hasExpandableWorkshopDescription
              ? "details"
              : "bio";

            return (
              <div
                key={event.id}
                ref={(node) => {
                  if (node) {
                    eventRefs.current.set(event.id, node);
                    return;
                  }

                  eventRefs.current.delete(event.id);
                }}
                className="relative flex gap-4"
                style={isLast ? { minHeight: 112 } : timelineRowStyle}
              >
                {/* Timeline marker */}
                <div className="relative z-10 flex w-14 shrink-0 justify-center">
                  <div
                    data-schedule-marker
                    style={getMarkerStyle(index, isActive, event.type)}
                  >
                    <ScheduleMarkerIcon type={event.type} />
                  </div>
                  {!isLast && (
                    <div style={getConnectorStyle(index, event.type)} />
                  )}
                </div>

                {/* Event content */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="relative pr-1">
                    {isActive && (
                      <div
                        className="-left-3 absolute top-1 h-[calc(100%-0.25rem)] w-1 rounded-full"
                        style={getActiveAccentStyle(event.type)}
                      />
                    )}
                    <div
                      className={cn(
                        "rounded-[18px] border-0 bg-transparent px-0 py-0",
                        isActive && "rounded-[20px] px-3 py-2"
                      )}
                      style={isActive ? getActiveContentStyle(event.type) : undefined}
                    >
                      {/* Time badge */}
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center text-lg font-medium leading-tight text-black">
                          {event.time}
                          {event.endTime && ` - ${event.endTime}`}
                        </span>
                        {showDelayNote && (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-black leading-none text-red-600">
                            {SCHEDULE_DELAY_NOTE}
                          </span>
                        )}
                        {isActive && (
                          <span className="-rotate-2 inline-flex items-center rounded-[48%_52%_44%_56%/58%_42%_55%_45%] border-2 border-red-600 bg-white px-2 py-0.5 text-[11px] font-black uppercase tracking-normal text-red-600">
                            Now
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="mb-0.5 flex items-center gap-2">
                        {canExpand ? (
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`${event.id}-bio`}
                            aria-label={`${isExpanded ? "Hide" : "Show"} ${expandableLabel} by clicking ${event.title}`}
                            onClick={toggleExpandedEvent}
                            className="min-w-0 text-left text-lg font-black leading-tight active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                            style={{ color: getEventTypeStyle(event.type).ink }}
                          >
                            {event.title}
                          </button>
                        ) : (
                          <h3
                            className="min-w-0 text-lg font-black leading-tight"
                            style={{ color: getEventTypeStyle(event.type).ink }}
                          >
                            {event.title}
                          </h3>
                        )}
                        {canExpand && (
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`${event.id}-bio`}
                            aria-label={`${isExpanded ? "Hide" : "Show"} ${expandableLabel} for ${event.title}`}
                            onClick={toggleExpandedEvent}
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                            style={{
                              borderColor: getEventTypeStyle(event.type).ink,
                              color: getEventTypeStyle(event.type).ink,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent transition-transform",
                                isExpanded && "rotate-180"
                              )}
                              style={{ borderTopColor: "currentColor" }}
                            />
                          </button>
                        )}
                      </div>

                      {/* Description */}
                      {event.description && !hasExpandableWorkshopDescription && (
                        <p className="mb-0.5 text-sm font-medium leading-snug text-black">
                          {event.description}
                        </p>
                      )}

                      {/* Location */}
                      {event.location && (
                        <div className="text-sm font-medium leading-snug text-neutral-500">
                          {event.location}
                        </div>
                      )}

                      {hasExpandableWorkshopDescription && isExpanded && (
                        <div
                          id={`${event.id}-bio`}
                          className="mt-3 border-t border-black/10 pt-3"
                        >
                          <p className="text-sm font-medium leading-snug text-black">
                            {event.description}
                          </p>
                        </div>
                      )}

                      {speaker?.bio && isExpanded && (
                        <div
                          id={`${event.id}-bio`}
                          className="mt-3 border-t border-black/10 pt-3"
                        >
                          <p className="text-sm font-black leading-tight text-black">
                            {speaker.name}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-snug text-black">
                            {speaker.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
