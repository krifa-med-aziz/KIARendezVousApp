declare module "*.css" {
  const content: any;
  export default content;
}

declare module "@expo/vector-icons" {
  import React from "react";
  export const Feather: React.FC<any>;
  export const MaterialCommunityIcons: React.FC<any>;
  export const MaterialIcons: React.FC<any>;
  export const FontAwesome: React.FC<any>;
  export const Ionicons: React.FC<any>;
}
