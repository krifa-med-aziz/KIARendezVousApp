import { Redirect } from "expo-router";

/** Legacy URL; canonical route is `/vehicles/add`. */
export default function LegacyAddVehicleRedirect() {
  return <Redirect href="/vehicles/add" />;
}
