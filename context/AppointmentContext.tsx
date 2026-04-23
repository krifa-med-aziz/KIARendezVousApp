import React, { createContext, useState } from 'react';
import { appointmentService } from '../services/appointmentService';

interface AppointmentData {
  vehicleId?: string;
  serviceId?: string;
  agencyId?: string;
  date?: string;
  time?: string;
}

interface AppointmentContextType {
  appointmentData: AppointmentData;
  updateAppointment: (data: Partial<AppointmentData>) => void;
  confirmAppointment: () => Promise<any>;
  clearAppointment: () => void;
}

export const AppointmentContext = createContext<AppointmentContextType>({} as AppointmentContextType);

export const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({});

  const updateAppointment = (data: Partial<AppointmentData>) => {
    setAppointmentData((prev) => ({ ...prev, ...data }));
  };

  const confirmAppointment = async () => {
    const res = await appointmentService.bookAppointment(appointmentData);
    return res;
  };

  const clearAppointment = () => setAppointmentData({});

  return (
    <AppointmentContext.Provider value={{ appointmentData, updateAppointment, confirmAppointment, clearAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
