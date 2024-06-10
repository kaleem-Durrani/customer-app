import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text, View } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native";
import "react-native-gesture-handler";
import StackNavigator from "./Navigations/StackNavigator/StackNavigtor";
import { useState } from "react";
import { AuthContext } from "./Contexts/AuthContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <StackNavigator />
        </GluestackUIProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
