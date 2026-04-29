import { createVehicle, getVehicles } from "@/lib/api/kiaApi";
import type { Vehicle } from "@/lib/types";

type VehicleInput = {
  name: string;
  plate: string;
  mileage: string;
  type: string;
  vin?: string;
};

export const vehicleService = {
  getVehicles: async (): Promise<Vehicle[]> => getVehicles(),
  addVehicle: async (vehicle: VehicleInput): Promise<Vehicle> =>
    createVehicle(vehicle),
};
