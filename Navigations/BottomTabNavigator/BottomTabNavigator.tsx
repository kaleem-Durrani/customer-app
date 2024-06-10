import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/BottomTabs/Home/Home";
import Purchase from "../../Screens/BottomTabs/Purchase/Purchase";
import Profile from "../../Screens/BottomTabs/Profile/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buy" component={Purchase} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
