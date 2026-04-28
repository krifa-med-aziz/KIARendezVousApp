export const VEHICLES = [
  {
    id: 1,
    name: "KIA EV6 GT-Line",
    plate: "ABC-1234",
    image: "../assets/cars/KIA EV6 GT-Line.avif",
    type: "ELECTRIC",
    battery: "92%",
    lastService: "Oct 12, 2023",
    mileage: "12,450 km",
    badge: "PLATINUM MEMBER",
  },
  {
    id: 2,
    name: "KIA Sorento",
    plate: "SUV-9821",
    image: "../assets/cars/KIA Sorento.avif",
    type: "SUV",
    lastService: "Sep 05, 2023",
    mileage: "45,800 km",
  },
  {
    id: 3,
    name: "KIA Sportage",
    plate: "K-DRIVE-22",
    image: "../assets/cars/KIA Sportage.avif",
    type: "SUV",
    lastService: "Aug 22, 2023",
    mileage: "31,200 km",
  },
];

export const DEFAULT_VEHICLE_IMAGE =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80";

export const SERVICES = [
  {
    id: 1,
    icon: "Wrench",
    title: "Full Maintenance",
    description:
      "Comprehensive 150-point inspection, fluid replacements, and total systems diagnostic.",
    price: 299,
    recommended: true,
  },
  {
    id: 2,
    icon: "Droplet",
    title: "Oil & Filter Change",
    description: "Synthetic oil swap and premium filter replacement.",
    price: 89,
    recommended: false,
  },
  {
    id: 3,
    icon: "Disc",
    title: "Brake Service",
    description: "Pad inspection, rotor resurfacing, and fluid flush.",
    price: 145,
    recommended: false,
  },
  {
    id: 4,
    icon: "RotateCcw",
    title: "Tire Rotation",
    description: "Pattern rotation and precision pressure balancing.",
    price: 45,
    recommended: false,
  },
  {
    id: 5,
    icon: "Snowflake",
    title: "AC Check",
    description: "System recharge and cabin filter sterilization.",
    price: 120,
    recommended: false,
  },
];

export const AGENCIES = [
  {
    id: 1,
    name: "KIA Central Agency",
    distance: "1.2km",
    highlight: true,
    address: "Plot 12, Main Street, Downtown",
    rating: 4.9,
    closingTime: "18:00",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=200",
  },
  {
    id: 2,
    name: "KIA North Shore Service",
    distance: "3.5km",
    highlight: false,
    address: "45 North Avenue",
    rating: 4.6,
    closingTime: "19:00",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=200",
  },
  {
    id: 3,
    name: "Metro KIA Express",
    distance: "5.8km",
    highlight: false,
    address: "78 Metro Boulevard",
    rating: 4.3,
    closingTime: "20:00",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=200",
  },
];

/** Calendar chips for booking; `id` is ISO date (YYYY-MM-DD) for context */
export const BOOKING_DATE_OPTIONS = [
  {
    id: "2024-10-21",
    day: "MON",
    date: "21",
    monthLabel: "October",
    year: 2024,
  },
  {
    id: "2024-10-22",
    day: "TUE",
    date: "22",
    monthLabel: "October",
    year: 2024,
  },
  {
    id: "2024-10-23",
    day: "WED",
    date: "23",
    monthLabel: "October",
    year: 2024,
  },
  {
    id: "2024-10-24",
    day: "THU",
    date: "24",
    monthLabel: "October",
    year: 2024,
  },
] as const;

export type Vehicle = (typeof VEHICLES)[number];
export type Service = (typeof SERVICES)[number];
export type Agency = (typeof AGENCIES)[number];
export type BookingDateOption = (typeof BOOKING_DATE_OPTIONS)[number];

export const MORNING_TIMES = ["08:30 AM", "09:00 AM", "09:30 AM", "11:00 AM"];
export const AFTERNOON_TIMES = ["01:30 PM", "02:00 PM", "03:30 PM", "04:00 PM"];
