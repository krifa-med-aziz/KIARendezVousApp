import type { BookingDateOption } from "@/lib/types";

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function getNextBookingDateOptions(count = 7): BookingDateOption[] {
  const today = new Date();
  const options: BookingDateOption[] = [];

  for (let index = 0; index < count; index += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + index + 1);
    const iso = date.toISOString().slice(0, 10);

    options.push({
      id: iso,
      day: DAY_NAMES[date.getDay()],
      date: String(date.getDate()),
      monthLabel: MONTH_LABELS[date.getMonth()],
      year: date.getFullYear(),
    });
  }

  return options;
}

export function getMorningTimeSlots(): string[] {
  return ["08:30 AM", "09:00 AM", "09:30 AM", "11:00 AM"];
}

export function getAfternoonTimeSlots(): string[] {
  return ["01:30 PM", "02:00 PM", "03:30 PM", "04:00 PM"];
}

export function to24HourTime(time12h: string): string {
  const match = time12h.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return time12h;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours < 12) hours += 12;

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

export function toIsoDateTime(dateIso: string, time12h: string): string {
  const time24 = to24HourTime(time12h);
  const [hours, minutes] = time24.split(":").map((value) => parseInt(value, 10));
  const date = new Date(`${dateIso}T00:00:00.000Z`);
  date.setUTCHours(hours, minutes, 0, 0);
  return date.toISOString();
}

