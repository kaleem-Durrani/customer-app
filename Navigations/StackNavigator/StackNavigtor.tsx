import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../Screens/Auth/Login/Login";
import Signup from "../../Screens/Auth/Signup/Signup";
import { useState } from "react";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState(true);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
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
