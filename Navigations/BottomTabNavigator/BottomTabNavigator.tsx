import React, { useEffect, useRef, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, HStack, VStack } from "@gluestack-ui/themed";
import Home from "../../Screens/BottomTabs/Home/Home";
import Purchase from "../../Screens/BottomTabs/Purchase/Purchase";
import Profile from "../../Screens/BottomTabs/Profile/Profile";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { Animated } from "react-native";
// import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [path, setPath] = useState("home");
  const [isAnimating, setIsAnimating] = useState(false);

  const [opacity, setOpacity] = useState(new Animated.Value(0));

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
            height: PERCENT[17],
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

          useEffect(() => {
            setIsAnimating(false);
            Animated.timing(opacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            }).start();
          }, [path]);

          return focused ? (
            <VStack alignItems="center">
              {!isAnimating && (
                <Animated.View style={{ opacity: opacity }}>
                  <View
                    bg={`${COLORS.tertiary}bb`}
                    p={"$2"}
                    borderRadius={"$full"}
                  >
                    <FontAwesome
                      name={iconName}
                      size={PERCENT[7]}
                      color={iconColor}
                    />
                  </View>
                </Animated.View>
              )}

              <Animated.Text
                style={{ marginLeft: 4, color: COLORS.tertiary, opacity }}
              >
                {!isAnimating && route.name}
              </Animated.Text>
            </VStack>
          ) : (
            <FontAwesome name={iconName} size={PERCENT[7]} color={iconColor} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setIsAnimating(true);
            setOpacity(new Animated.Value(0));
            setPath("home");
            navigation.navigate("Home");
          },
        })}
      />
      <Tab.Screen
        name="Buy"
        component={Purchase}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setIsAnimating(true);
            setOpacity(new Animated.Value(0));
            setPath("buy");
            navigation.navigate("Buy");
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setIsAnimating(true);
            setOpacity(new Animated.Value(0));
            setPath("profile");
            navigation.navigate("Profile");
          },
        })}
      />
    </Tab.Navigator>
  );
}
