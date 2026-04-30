import { paramFirst, parsePositiveInt } from "@/lib/routeParams";

export type BookingSuccessPayload = {
  /** Backend id (numeric or string, e.g. UUID). */
  appointmentId: string;
  vehicleId: number;
  serviceId: number;
  agencyId: number;
  date: string;
  time: string;
};

export function encodeBookingSuccessSummary(payload: BookingSuccessPayload): string {
  return encodeURIComponent(JSON.stringify(payload));
}

type RawParams = {
  summary?: string | string[];
  appointmentId?: string | string[];
  vehicleId?: string | string[];
  serviceId?: string | string[];
  agencyId?: string | string[];
  date?: string | string[];
  time?: string | string[];
};

export function parseBookingSuccessParams(
  params: RawParams,
): BookingSuccessPayload | null {
  const summaryRaw = paramFirst(params.summary);
  if (summaryRaw) {
    try {
      const decoded = decodeURIComponent(summaryRaw);
      const parsed = JSON.parse(decoded) as Record<string, unknown>;
      const appointmentId =
        parsed.appointmentId !== undefined && parsed.appointmentId !== null
          ? String(parsed.appointmentId)
          : "";
      const vehicleId =
        typeof parsed.vehicleId === "number" ? parsed.vehicleId : null;
      const serviceId =
        typeof parsed.serviceId === "number" ? parsed.serviceId : null;
      const agencyId =
        typeof parsed.agencyId === "number" ? parsed.agencyId : null;
      const date = typeof parsed.date === "string" ? parsed.date : "";
      const time = typeof parsed.time === "string" ? parsed.time : "";
      if (
        appointmentId &&
        vehicleId !== null &&
        serviceId !== null &&
        agencyId !== null &&
        date &&
        time
      ) {
        return {
          appointmentId,
          vehicleId,
          serviceId,
          agencyId,
          date,
          time,
        };
      }
    } catch {
      /* fall through */
    }
  }

  const vehicleId = parsePositiveInt(paramFirst(params.vehicleId));
  const serviceId = parsePositiveInt(paramFirst(params.serviceId));
  const agencyId = parsePositiveInt(paramFirst(params.agencyId));
  const date = paramFirst(params.date);
  const time = paramFirst(params.time);
  const appointmentRaw = paramFirst(params.appointmentId);
  const appointmentId =
    appointmentRaw !== undefined && appointmentRaw !== ""
      ? String(appointmentRaw)
      : "";

  if (
    vehicleId === null ||
    serviceId === null ||
    agencyId === null ||
    !date ||
    !time ||
    !appointmentId
  ) {
    return null;
  }

  return {
    appointmentId,
    vehicleId,
    serviceId,
    agencyId,
    date,
    time,
  };
}
