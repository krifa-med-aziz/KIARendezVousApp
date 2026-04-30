import type { Appointment } from "@/lib/types";

export type AppointmentListTab = "upcoming" | "completed" | "canceled";

/** Parse appointment local datetime for comparison (best-effort). */
export function formatAppointmentDateDisplay(a: Appointment): string {
  try {
    const d = appointmentDateTime(a);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return a.date;
  }
}

export function appointmentDateTime(a: Appointment): Date {
  const datePart = a.date.includes("T") ? a.date.split("T")[0] : a.date;
  const t = (a.time || "12:00").trim();
  const iso = `${datePart}T${t.length <= 5 ? `${t}:00` : t}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
}

export function appointmentTab(a: Appointment): AppointmentListTab {
  const s = (a.status || "").toLowerCase();
  if (s.includes("cancel")) return "canceled";
  if (s.includes("complete") || s.includes("done") || s.includes("finish")) {
    return "completed";
  }
  const at = appointmentDateTime(a);
  const now = new Date();
  if (at < now && (s.includes("confirm") || s.includes("book"))) {
    return "completed";
  }
  return "upcoming";
}

export function nextUpcomingAppointment(
  list: Appointment[],
): Appointment | null {
  const now = new Date();
  const upcoming = list
    .filter((a) => appointmentTab(a) === "upcoming")
    .filter((a) => appointmentDateTime(a) >= now)
    .sort(
      (x, y) =>
        appointmentDateTime(x).getTime() - appointmentDateTime(y).getTime(),
    );
  return upcoming[0] ?? null;
}
