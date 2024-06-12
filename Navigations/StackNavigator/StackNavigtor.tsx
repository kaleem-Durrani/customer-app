import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../Screens/Auth/Login/Login";
import Signup from "../../Screens/Auth/Signup/Signup";
import { useState } from "react";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import HistoryTopTabNavigator from "../HistoryTopTabNavigator/HistoryTopTabNavigator";
import TopUp from "../../Screens/TopUp/TopUp";
import Transfer from "../../Screens/Transfer/Transfer";
import MapLocator from "../../Screens/MapLocator/MapLocator";
import LoyaltyScreen from "../../Screens/LoyaltyScreen/LoyaltyScreen";
import FAQs from "../../Screens/FAQs/FAQs";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState(true);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
          <Stack.Screen name="History" component={HistoryTopTabNavigator} />
          <Stack.Screen name="TopUp" component={TopUp} />
          <Stack.Screen name="Transfer" component={Transfer} />
          <Stack.Screen name="MapLocator" component={MapLocator} />
          <Stack.Screen name="LoyaltyScreen" component={LoyaltyScreen} />
          <Stack.Screen name="FAQs" component={FAQs} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
