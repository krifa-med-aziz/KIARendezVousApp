import { getAppointments } from "@/lib/api/kiaApi";
import type { Appointment } from "@/lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AppointmentsContextValue = {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const AppointmentsContext = createContext<AppointmentsContextValue | null>(
  null,
);

export function AppointmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (e) {
      setAppointments([]);
      setError(e instanceof Error ? e.message : "Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ appointments, isLoading, error, refresh }),
    [appointments, isLoading, error, refresh],
  );

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments(): AppointmentsContextValue {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return ctx;
}
