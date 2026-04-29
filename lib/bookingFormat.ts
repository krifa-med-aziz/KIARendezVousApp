import type { BookingDateOption } from "@/lib/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatBookingDateLabel(d: BookingDateOption): string {
  const m = MONTHS[new Date(d.id + "T12:00:00").getMonth()] ?? d.monthLabel.slice(0, 3);
  const dayNum = parseInt(d.date, 10);
  return `${m} ${dayNum}, ${d.year}`;
}

export function formatBookingDateShort(d: BookingDateOption): string {
  const m = MONTHS[new Date(d.id + "T12:00:00").getMonth()] ?? "Oct";
  return `${m} ${d.date}`;
}

export function weekdayFromIso(isoDate: string): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const w = new Date(isoDate + "T12:00:00").getDay();
  return days[w] ?? "";
}
