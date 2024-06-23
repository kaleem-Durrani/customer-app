import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import "react-native-gesture-handler";
import StackNavigator from "./Navigations/StackNavigator/StackNavigtor";
import { AuthContext } from "./Contexts/AuthContext";

// Ensure gesture handler is at the top
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "./Constants/Constants";
// import { StatusBar } from "react-native";
// import { StatusBar } from "expo-status-bar";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <GluestackUIProvider config={config}>
            <StatusBar
              backgroundColor={`${COLORS.tertiary}`}
              barStyle={"light-content"}
            />
            <StackNavigator />
          </GluestackUIProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
