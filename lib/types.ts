export type Vehicle = {
  id: number;
  name: string;
  plate: string;
  mileage: string;
  type: string;
  vin?: string | null;
  createdAt?: string;
  image?: string | null;
  battery?: string | null;
  badge?: string | null;
  lastService?: string | null;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration?: number;
  icon?: string;
  recommended?: boolean;
};

export type Agency = {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  address?: string;
  distance?: string;
  highlight?: boolean;
  rating?: number;
  closingTime?: string;
  image?: string;
};

export type BookingDateOption = {
  id: string;
  day: string;
  date: string;
  monthLabel: string;
  year: number;
};

export type Appointment = {
  id: number;
  userId: string;
  vehicleId: number;
  serviceId: number;
  agencyId: number;
  date: string;
  time: string;
  status: string;
  createdAt: string;
};

