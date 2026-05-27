/** App-wide UI and behaviour constants */

export const DEFAULT_VEHICLE_IMAGE =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80";

export const SPLASH_DURATION_MS = 3500;

export const TUNISIAN_PHONE_REGEX = /^\+216\d{8}$/;

export const BOOKING_STEPS = [
  "Vehicle",
  "Service",
  "Agency",
  "Time",
  "Confirm",
] as const;
