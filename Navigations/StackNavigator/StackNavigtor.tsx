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
import PersonalDetails from "../../Screens/ProfileTabInnerScreens/PersonalDetails/PersonalDetails";
import ChangePassword from "../../Screens/ProfileTabInnerScreens/ChangePassword/ChangePassword";
import Notifications from "../../Screens/ProfileTabInnerScreens/Notifications/Notifications";
import CustomerSupport from "../../Screens/ProfileTabInnerScreens/CustomerSupport/CustomerSupport";
import PrivacyPolicy from "../../Screens/ProfileTabInnerScreens/PrivacyPolicy/PrivacyPolicy";
import HistoryContainer from "../HistoryTopTabNavigator/HistoryContainer";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState(true);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
          <Stack.Screen name="History" component={HistoryContainer} />
          <Stack.Screen name="TopUp" component={TopUp} />
          <Stack.Screen name="Transfer" component={Transfer} />
          <Stack.Screen name="MapLocator" component={MapLocator} />
          <Stack.Screen name="LoyaltyScreen" component={LoyaltyScreen} />
          <Stack.Screen name="FAQs" component={FAQs} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
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
