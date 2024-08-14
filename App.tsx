import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import StackNavigator from "./Navigations/StackNavigator/StackNavigtor";
import AuthContext from "./auth/context";
import ProfileContext from "./Contexts/ProfileContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "./Constants/Constants";
import authStorage from "./auth/storage";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    setIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady) {
    return null; // Keep rendering null until the app is ready
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <NavigationContainer>
            <GluestackUIProvider config={config}>
              <StatusBar
                backgroundColor={`${COLORS.tertiary}`}
                barStyle={"light-content"}
              />
              <StackNavigator />
            </GluestackUIProvider>
          </NavigationContainer>
        </ProfileContext.Provider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
