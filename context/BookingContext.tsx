import type { Agency, BookingDateOption, Service, Vehicle } from "@/data/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type BookingState = {
  selectedVehicle: Vehicle | null;
  selectedService: Service | null;
  selectedAgency: Agency | null;
  selectedDate: BookingDateOption | null;
  selectedTime: string | null;
};

type BookingContextValue = BookingState & {
  setVehicle: (vehicle: Vehicle | null) => void;
  setService: (service: Service | null) => void;
  setAgency: (agency: Agency | null) => void;
  setDate: (date: BookingDateOption | null) => void;
  setTime: (time: string | null) => void;
  resetBooking: () => void;
  isBookingComplete: () => boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedVehicle, setVehicleState] = useState<Vehicle | null>(null);
  const [selectedService, setServiceState] = useState<Service | null>(null);
  const [selectedAgency, setAgencyState] = useState<Agency | null>(null);
  const [selectedDate, setDateState] = useState<BookingDateOption | null>(null);
  const [selectedTime, setTimeState] = useState<string | null>(null);

  const setVehicle = useCallback((vehicle: Vehicle | null) => {
    setVehicleState(vehicle);
  }, []);

  const setService = useCallback((service: Service | null) => {
    setServiceState(service);
  }, []);

  const setAgency = useCallback((agency: Agency | null) => {
    setAgencyState(agency);
  }, []);

  const setDate = useCallback((date: BookingDateOption | null) => {
    setDateState(date);
  }, []);

  const setTime = useCallback((time: string | null) => {
    setTimeState(time);
  }, []);

  const resetBooking = useCallback(() => {
    setVehicleState(null);
    setServiceState(null);
    setAgencyState(null);
    setDateState(null);
    setTimeState(null);
  }, []);

  const isBookingComplete = useCallback(
    () =>
      !!(
        selectedVehicle &&
        selectedService &&
        selectedAgency &&
        selectedDate &&
        selectedTime
      ),
    [
      selectedVehicle,
      selectedService,
      selectedAgency,
      selectedDate,
      selectedTime,
    ],
  );

  const value = useMemo(
    () => ({
      selectedVehicle,
      selectedService,
      selectedAgency,
      selectedDate,
      selectedTime,
      setVehicle,
      setService,
      setAgency,
      setDate,
      setTime,
      resetBooking,
      isBookingComplete,
    }),
    [
      selectedVehicle,
      selectedService,
      selectedAgency,
      selectedDate,
      selectedTime,
      setVehicle,
      setService,
      setAgency,
      setDate,
      setTime,
      resetBooking,
      isBookingComplete,
    ],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
