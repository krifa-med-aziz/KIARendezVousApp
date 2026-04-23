/** Typed route hrefs for Expo Router */
export const routes = {
  login: "/login",
  signup: "/signup",
  main: "/(main)",
  notifications: "/notifications",
  vehicleDetails: "/vehicle-details",
  addVehicle: "/add-vehicle",
  booking: {
    selectVehicle: "/booking/select-vehicle",
    selectService: "/booking/select-service",
    selectAgency: "/booking/select-agency",
    selectAppointment: "/booking/select-appointment",
    confirmation: "/booking/confirmation",
    success: "/booking/success",
  },
} as const;
