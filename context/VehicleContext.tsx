import React, { createContext, useState, useEffect, useCallback } from "react";
import { vehicleService } from "@/services/vehicleService";
import type { Vehicle } from "@/lib/types";

interface VehicleContextType {
  vehicles: Vehicle[];
  isLoading: boolean;
  addVehicle: (v: {
    name: string;
    plate: string;
    mileage: string;
    type: string;
    vin?: string;
  }) => Promise<void>;
  loadVehicles: () => Promise<void>;
}

export const VehicleContext = createContext<VehicleContextType>(
  {} as VehicleContextType,
);

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch {
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addVehicle = async (v: {
    name: string;
    plate: string;
    mileage: string;
    type: string;
    vin?: string;
  }) => {
    setIsLoading(true);
    try {
      await vehicleService.addVehicle(v);
      await loadVehicles();
    } catch {
      // keep existing list on failure
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  return (
    <VehicleContext.Provider
      value={{ vehicles, isLoading, addVehicle, loadVehicles }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
