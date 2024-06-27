import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../Screens/Auth/Login/Login";
import Signup from "../../Screens/Auth/Signup/Signup";
import { useContext, useState } from "react";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import HistoryTopTabNavigator from "../HistoryTopTabNavigator/HistoryTopTabNavigator";
import TopUp from "../../Screens/TopUp/TopUp";
import Transfer from "../../Screens/Transfer/Transfer";
import MapLocator from "../../Screens/MapLocator/MapLocator";
import LoyaltyScreen from "../../Screens/LoyaltyScreen/LoyaltyScreen";
import FAQs from "../../Screens/FAQs/FAQs";
import PersonalDetails from "../../Screens/ProfileTabInnerScreens/PersonalDetails/PersonalDetails";
import ChangePassword from "../../Screens/ProfileTabInnerScreens/ChangePassword/ChangePassword";
import Notifications from "../../Screens/ProfileTabInnerScreens/Notifications/Notifications";
import CustomerSupport from "../../Screens/ProfileTabInnerScreens/CustomerSupport/CustomerSupport";
import PrivacyPolicy from "../../Screens/ProfileTabInnerScreens/PrivacyPolicy/PrivacyPolicy";
import HistoryContainer from "../HistoryTopTabNavigator/HistoryContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../Contexts/AuthContext";

// const Stack = createStackNavigator();

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            // options={{ animation: "fade_from_bottom" }}
            name="BottomTabs"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_bottom",
            }}
            name="History"
            component={HistoryContainer}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_bottom",
            }}
            name="TopUp"
            component={TopUp}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_bottom",
            }}
            name="Transfer"
            component={Transfer}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_left",
            }}
            name="MapLocator"
            component={MapLocator}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_left",
            }}
            name="LoyaltyScreen"
            component={LoyaltyScreen}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_left",
            }}
            name="FAQs"
            component={FAQs}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_right",
            }}
            name="PersonalDetails"
            component={PersonalDetails}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_right",
            }}
            name="ChangePassword"
            component={ChangePassword}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_right",
            }}
            name="Notifications"
            component={Notifications}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_right",
            }}
            name="CustomerSupport"
            component={CustomerSupport}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_right",
            }}
            name="PrivacyPolicy"
            component={PrivacyPolicy}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{ animation: "slide_from_left" }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ animation: "slide_from_right" }}
            name="Signup"
            component={Signup}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
