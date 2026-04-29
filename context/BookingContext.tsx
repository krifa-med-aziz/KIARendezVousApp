import type { BookingDateOption } from "@/lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type BookingState = {
  selectedVehicleId: number | null;
  selectedServiceId: number | null;
  selectedAgencyId: number | null;
  selectedDate: BookingDateOption | null;
  selectedTime: string | null;
};

type BookingContextValue = BookingState & {
  setVehicleId: (vehicleId: number | null) => void;
  setServiceId: (serviceId: number | null) => void;
  setAgencyId: (agencyId: number | null) => void;
  setDate: (date: BookingDateOption | null) => void;
  setTime: (time: string | null) => void;
  resetBooking: () => void;
  isBookingComplete: () => boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedVehicleId, setVehicleState] = useState<number | null>(null);
  const [selectedServiceId, setServiceState] = useState<number | null>(null);
  const [selectedAgencyId, setAgencyState] = useState<number | null>(null);
  const [selectedDate, setDateState] = useState<BookingDateOption | null>(null);
  const [selectedTime, setTimeState] = useState<string | null>(null);

  const setVehicleId = useCallback((vehicleId: number | null) => {
    setVehicleState(vehicleId);
  }, []);

  const setServiceId = useCallback((serviceId: number | null) => {
    setServiceState(serviceId);
    setAgencyState(null);
  }, []);

  const setAgencyId = useCallback((agencyId: number | null) => {
    setAgencyState(agencyId);
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
        selectedVehicleId &&
        selectedServiceId &&
        selectedAgencyId &&
        selectedDate &&
        selectedTime
      ),
    [
      selectedVehicleId,
      selectedServiceId,
      selectedAgencyId,
      selectedDate,
      selectedTime,
    ],
  );

  const value = useMemo(
    () => ({
      selectedVehicleId,
      selectedServiceId,
      selectedAgencyId,
      selectedDate,
      selectedTime,
      setVehicleId,
      setServiceId,
      setAgencyId,
      setDate,
      setTime,
      resetBooking,
      isBookingComplete,
    }),
    [
      selectedVehicleId,
      selectedServiceId,
      selectedAgencyId,
      selectedDate,
      selectedTime,
      setVehicleId,
      setServiceId,
      setAgencyId,
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
