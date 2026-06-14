import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import {
  MarkaziText_500Medium,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { loadUserInfo, useUserInfo } from "./hooks/useUserInfo";
import { HomeScreen } from "./screens/HomeScreen";
import { RootStackParamList } from "./screens/navigation";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SplashScreen } from "./screens/SplashScreen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initDb } from "./db";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppInner = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      await initDb();
      setReady(true);
    }
    async function fetchUserInfo() {
      await loadUserInfo();
    }

    bootstrap();
    fetchUserInfo();
  }, []);

  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    MarkaziText_500Medium,
    MarkaziText_700Bold,
  });
  const userInfo = useUserInfo();

  const isOnboardingComplete = userInfo.firstName && userInfo.email;

  return userInfo.loadingData || !fontsLoaded || !ready ? (
    <SplashScreen />
  ) : (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isOnboardingComplete ? "Home" : "Onboarding"}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppInner />
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
