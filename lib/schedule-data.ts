import type { ComponentType } from "react";
import { Mic } from "lucide-react";
import { TimelineEvent } from "@/types/schedule";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "registration",
    time: "11:30",
    endTime: "12:30",
    title: "Registration",
    location: "Main Entrance",
    type: "registration",
  },
  {
    id: "session-host-aliki",
    time: "12:30",
    endTime: "12:35",
    title: "Αλίκη Συνατσάκη",
    description: "Hostess",
    location: "Main Stage - 2ος όροφος",
    type: "ceremony",
  },
  {
    id: "session-1-curators",
    time: "12:35",
    endTime: "12:45",
    title: "Curators",
    location: "Main Stage",
    type: "ceremony",
  },
  {
    id: "session-1-sign-language",
    time: "12:45",
    endTime: "12:50",
    title: "Νοηματική - HANDS UP",
    location: "Main Stage",
    type: "performance",
  },
  {
    id: "session-1-qgame",
    time: "12:50",
    endTime: "13:00",
    title: "QGame Performance",
    location: "Main Stage",
    type: "performance",
  },
  {
    id: "speaker-tsapanou",
    time: "13:00",
    endTime: "13:18",
    title: "Τσάπανου Αγγελική",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "speaker-karantinou",
    time: "13:18",
    endTime: "13:36",
    title: "Καραντινού Καλυψώ",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "speaker-ifigeneia",
    time: "13:36",
    endTime: "13:54",
    title: "Καραμήτρου Ιφιγένεια",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "session-host-aliki",
    time: "13:54",
    endTime: "14:00",
    title: "Αλίκη Συνατσάκη",
    description: "Hostess",
    location: "Main Stage",
    type: "ceremony",
  },
  {
    id: "break-1",
    time: "14:00",
    endTime: "15:15",
    title: "1st Break",
    type: "break",
  },
  {
    id: "theater-workshop",
    time: "14:30",
    endTime: "15:00",
    title: "Θεατρικό Εργαστήρι",
    description:
      "Σε αυτό το εργαστήρι, ερχόμαστε σε επαφή με την αισθητηριακή διάσταση του σώματός μας, ενεργοποιώντας την παρατήρηση και το σκηνικό μας ένστικτο. Συντονίζει η Θεοδώρα Αγριτάκη, η οποία με φόντο τις Θεατρικές Σπουδές στο ΕΚΠΑ, δραστηριοποιείται στη θεατρική εκπαίδευση ενηλίκων και την πολιτιστική διαχείριση.",
    location: "Main Stage - Όροφος: 2ος",
    type: "workshop",
  },
  {
    id: "session-host-aliki",
    time: "15:20",
    endTime: "15:25",
    title: "Αλίκη Συνατσάκη",
    description: "Hostess",
    location: "Main Stage",
    type: "ceremony",
  },
  {
    id: "session-2-standup",
    time: "15:25",
    endTime: "15:35",
    title: "Χρήστος Μακαριάδης - Stand up comedy Performance",
    location: "Main Stage",
    type: "performance",
  },
  {
    id: "speaker-marina",
    time: "15:35",
    endTime: "15:53",
    title: "Μαρίνα Τοπούζη",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "speaker-fylaktakis",
    time: "15:53",
    endTime: "16:11",
    title: "Φυλακτάκης Χρίστος",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "speaker-nina",
    time: "16:11",
    endTime: "16:29",
    title: "Νινα Αλεξανδρίδου",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "session-host-aliki",
    time: "16:29",
    endTime: "16:35",
    title: "Αλίκη Συνατσάκη",
    description: "Hostess",
    location: "Main Stage",
    type: "ceremony",
  },
  {
    id: "break-2",
    time: "16:35",
    endTime: "17:50",
    title: "2nd Break",
    type: "break",
  },
  {
    id: "wine-tasting-workshop",
    time: "17:15",
    endTime: "17:45",
    title: "Wine Tasting Workshop",
    description:
      "Μια εισαγωγή στην οργανοληπτική δοκιμή μέσα από τρία μονοποικιλιακά κρασιά. Ανακαλύπτουμε πώς ο εγκέφαλος συνδέει τη γεύση, το άρωμα και την υφή με τη μνήμη μας. Μέσα από απλά sensory exercises, κατανοούμε πώς λειτουργούν οι αισθήσεις μας. Το workshop θα πραγματοποιηθεί από τον Ευάγγελο Μπερή, καθηγητή στο τμήμα Επιστημών Οίνου, Αμπέλου και Ποτών του Πανεπιστημίου Δυτικής Αττικής, ο οποίος θα είναι και ομιλητής στο φετινό event.",
    location: "Όροφος: -2",
    type: "workshop",
  },
  {
    id: "session-host-aliki",
    time: "17:50",
    endTime: "17:55",
    title: "Αλίκη Συνατσάκη",
    description: "Hostess",
    location: "Main Stage",
    type: "ceremony",
  },
  {
    id: "speaker-makris",
    time: "17:55",
    endTime: "18:13",
    title: "Μακρής Θάνος",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "speaker-mperis",
    time: "18:13",
    endTime: "18:31",
    title: "Μπερής Ευάγγελος",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "speaker-theofanidis",
    time: "18:31",
    endTime: "18:49",
    title: "Θεοφανίδης Κυριάκος",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "session-3-song",
    time: "18:49",
    endTime: "18:59",
    title: "Έλενα&Γιώργος τραγούδι PERFORMANCE",
    location: "Main Stage",
    type: "performance",
  },
  {
    id: "session-host-aliki",
    time: "18:59",
    endTime: "19:04",
    title: "Αλίκη Συνατσάκη",
    description: "Hostess",
    location: "Main Stage",
    type: "ceremony",
  },
  {
    id: "speaker-kaperonis",
    time: "19:04",
    endTime: "19:14",
    title: "ΚΑΠΕΡΩΝΗΣ",
    location: "Main Stage",
    type: "talk",
  },
  {
    id: "session-3-curators",
    time: "19:14",
    endTime: "19:24",
    title: "Curators",
    location: "Main Stage",
    type: "ceremony",
  },
];

type EventIcon =
  | {
      kind: "component";
      Icon: ComponentType<{ className?: string }>;
    }
  | {
      kind: "image";
      src: string;
    };

export const eventIcons: Record<TimelineEvent["type"], EventIcon> = {
  registration: {
    kind: "image",
    src: "/schedule/register.svg",
  },
  talk: {
    kind: "component",
    Icon: Mic,
  },
  break: {
    kind: "image",
    src: "/schedule/break.svg",
  },
  workshop: {
    kind: "image",
    src: "/schedule/eye.svg",
  },
  performance: {
    kind: "image",
    src: "/schedule/eye.svg",
  },
  ceremony: {
    kind: "image",
    src: "/schedule/eye.svg",
  },
};

export const eventColors: Record<TimelineEvent["type"], string> = {
  registration: "bg-neutral-100 text-neutral-600",
  talk: "bg-amber-50 text-amber-600",
  break: "bg-emerald-50 text-emerald-600",
  workshop: "bg-violet-50 text-violet-600",
  performance: "bg-pink-50 text-pink-600",
  ceremony: "bg-sky-50 text-sky-600",
};

export const dotColors: Record<TimelineEvent["type"], string> = {
  registration: "bg-neutral-400",
  talk: "bg-amber-400",
  break: "bg-emerald-400",
  workshop: "bg-violet-400",
  performance: "bg-pink-400",
  ceremony: "bg-sky-400",
};
