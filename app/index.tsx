import SplashScreen from "@/components/SplashScreen";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

const SPLASH_MS = 3500;

export default function Index() {
  const { userEmail } = useAuth();
  const redirected = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (redirected.current) return;
      redirected.current = true;
      if (userEmail) {
        router.replace(routes.main);
      } else {
        router.replace(routes.login);
      }
    }, SPLASH_MS);

    return () => clearTimeout(timer);
  }, [userEmail]);

  return <SplashScreen />;
}
