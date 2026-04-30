import { apiFetch } from "@/lib/api/http";
import type { Agency, Appointment, Service, Vehicle } from "@/lib/types";

export type CreateVehicleInput = {
  name: string;
  plate: string;
  mileage: string;
  type: string;
  vin?: string;
};

export type CreateAppointmentInput = {
  vehicleId: number;
  serviceId: number;
  agencyId: number;
  date: string;
  time: string;
};

export async function getServices(): Promise<Service[]> {
  return apiFetch<Service[]>("/services");
}

export async function getAgencies(serviceId: number): Promise<Agency[]> {
  return apiFetch<Agency[]>(`/agencies?serviceId=${serviceId}`);
}

export async function getVehicles(): Promise<Vehicle[]> {
  return apiFetch<Vehicle[]>("/vehicles");
}

export async function createVehicle(data: CreateVehicleInput): Promise<Vehicle> {
  return apiFetch<Vehicle>("/vehicles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createAppointment(
  data: CreateAppointmentInput,
): Promise<Appointment> {
  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}



export async function getAppointments(): Promise<Appointment[]> {
  return apiFetch<Appointment[]>("/appointments"); 
}

export async function cancelAppointment(id: number): Promise<void> {
  return apiFetch<void>(`/appointments/${id}`, {
    method: "DELETE",
  });
}
