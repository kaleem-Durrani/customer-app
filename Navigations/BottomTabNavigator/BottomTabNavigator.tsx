import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, HStack } from "@gluestack-ui/themed";
import Home from "../../Screens/BottomTabs/Home/Home";
import Purchase from "../../Screens/BottomTabs/Purchase/Purchase";
import Profile from "../../Screens/BottomTabs/Profile/Profile";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.tertiary,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: [
          {
            backgroundColor: COLORS.secondary,
            // height: PERCENT[16],
            // borderTopLeftRadius: 30,
            // borderTopRightRadius: 30,
          },
          null,
        ],
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let iconColor = focused ? "white" : "gray";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Buy") {
            iconName = "qrcode";
          } else if (route.name === "Profile") {
            iconName = "user-circle-o";
          }
          return focused ? (
            <HStack alignItems="center">
              <View bg={`${COLORS.tertiary}bb`} p={"$2"} borderRadius={"$full"}>
                <FontAwesome
                  name={iconName}
                  size={PERCENT[7]}
                  color={iconColor}
                />
              </View>
              <Text ml={"$1"} color={COLORS.tertiary}>
                {route.name}
              </Text>
            </HStack>
          ) : (
            <FontAwesome name={iconName} size={PERCENT[7]} color={iconColor} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buy" component={Purchase} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
