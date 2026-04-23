import React, { createContext, useContext, useState, useEffect } from 'react';
import { vehicleService } from '../services/vehicleService';

type Vehicle = { id: string; brand: string; model: string; plateNumber: string; year: number };

interface VehicleContextType {
  vehicles: Vehicle[];
  isLoading: boolean;
  addVehicle: (v: Omit<Vehicle, 'id'>) => Promise<void>;
  loadVehicles: () => Promise<void>;
}

export const VehicleContext = createContext<VehicleContextType>({} as VehicleContextType);

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addVehicle = async (v: Omit<Vehicle, 'id'>) => {
    setIsLoading(true);
    try {
      const newVehicle = await vehicleService.addVehicle(v);
      setVehicles([...vehicles, newVehicle]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles, isLoading, addVehicle, loadVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};
