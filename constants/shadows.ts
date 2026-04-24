import { ViewStyle } from "react-native";

/** Soft card shadow — matches Home appointment card */
export const cardShadowStyle: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 5,
};

/** Light tile shadow — white quick-action card */
export const tileShadowStyle: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 15,
  elevation: 4,
};

/** Primary CTA shadow */
export const primaryShadowStyle: ViewStyle = {
  shadowColor: "#93001B",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.25,
  shadowRadius: 15,
  elevation: 6,
};

/** Red quick-action tile */
export const primaryTileShadowStyle: ViewStyle = {
  shadowColor: "#93001B",
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 8,
};
