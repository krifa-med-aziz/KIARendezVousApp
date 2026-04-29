/** Typed route hrefs for Expo Router */
export const routes = {
  login: "/login",
  signup: "/signup",
  verifyOtp: "/verify-otp",
  main: "/(main)",
  profile: "/profile",
  profileEdit: "/profile/edit",
  settings: "/settings",
  settingsPassword: "/settings/password",
  notifications: "/notifications",
  vehicleDetails: "/vehicle-details",
  addVehicle: "/vehicles/add",
  booking: {
    selectVehicle: "/booking/select-vehicle",
    selectService: "/booking/select-service",
    selectAgency: "/booking/select-agency",
    selectAppointment: "/booking/select-appointment",
    confirmation: "/booking/confirmation",
    success: "/booking/success",
    tracking: "/booking/tracking",
  },
} as const;
