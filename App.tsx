import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import "react-native-gesture-handler";
import StackNavigator from "./Navigations/StackNavigator/StackNavigtor";
import { AuthContext } from "./Contexts/AuthContext";

// Ensure gesture handler is at the top
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <GluestackUIProvider config={config}>
            <StackNavigator />
          </GluestackUIProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
