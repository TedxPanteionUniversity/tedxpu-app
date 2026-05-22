import { timelineEvents } from "@/lib/schedule-data";
import type { Workshop } from "@/types/workshop";

const workshopDetailsById: Record<
  string,
  Pick<Workshop, "description" | "facilitator" | "room" | "seatsLeft" | "registerHref">
> = {
  "theater-workshop": {
    description: "",
    facilitator: "Θεοδώρα Αγριτάκη",
    room: "Όροφος: -2",
    seatsLeft: 0,
    registerHref: "https://docs.google.com/forms/d/e/1FAIpQLSf6hjhriTNK0SfPGBQkI7PKYb5oc47XUGW8SO_uQvLASVd-YQ/viewform?pli=1",
  },
  "wine-tasting-workshop": {
    description: "",
    facilitator: "Ευάγγελος Μπερής",
    room: "Όροφος: 3ος",
    seatsLeft: 2,
    registerHref: "https://docs.google.com/forms/d/e/1FAIpQLSf7JB9ocr8OxlzT88oJL5bOMbk1cg-oaTGQiw91GyO1YDb1hA/viewform",
  },
};

function formatWorkshopTime(time: string, endTime?: string) {
  return endTime ? `${time} - ${endTime}` : time;
}

export const workshops: Workshop[] = timelineEvents
  .filter((event) => event.type === "workshop")
  .map((event) => {
    const details = workshopDetailsById[event.id];

    return {
      title: event.title,
      description: details?.description ?? "",
      facilitator: details?.facilitator ?? "",
      time: formatWorkshopTime(event.time, event.endTime),
      room: details?.room ?? event.location ?? "",
      seatsLeft: details?.seatsLeft ?? 0,
      registerHref: details?.registerHref ?? "#",
    };
  });
