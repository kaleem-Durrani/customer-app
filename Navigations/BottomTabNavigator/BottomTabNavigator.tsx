import React, { useEffect, useRef, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, HStack, VStack } from "@gluestack-ui/themed";
import Home from "../../Screens/BottomTabs/Home/Home";
import Purchase from "../../Screens/BottomTabs/Purchase/Purchase";
import Profile from "../../Screens/BottomTabs/Profile/Profile";
import { COLORS, HEIGHT, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { Animated, Keyboard } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";

// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();

export default function BottomTabNavigator() {
  const [path, setPath] = useState("home");
  const [isAnimating, setIsAnimating] = useState(false);

  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.tertiary,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarPressColor: `${COLORS.tertiary}30`,

        tabBarItemStyle: [
          {
            // backgroundColor: "cyan",
            // padding: 20,
          },
        ],

        tabBarLabelStyle: [
          {
            // margin: 50,
          },
        ],

        tabBarIndicatorStyle: [
          {
            // backgroundColor: COLORS.tertiary,
            position: "relative",
            // borderRadius: 50,
            // width: "30%",
          },
        ],
        tabBarContentContainerStyle: [
          {
            display: isKeyboardOpen ? "none" : "flex",

            // borderRadius: 50,
            // backgroundColor: "cyan",
            // padding: 10,
            // margin: 10,
          },
        ],

        tabBarIndicatorContainerStyle: [
          {
            // backgroundColor: "red",
            borderRadius: 50,
          },
        ],

        tabBarIconStyle: [
          {
            alignContent: "center",
            height: HEIGHT * 0.055,
            width: PERCENT[17],
            alignItems: "center",
            // backgroundColor: "lightgray",
            justifyContent: "center",
            padding: 0,
            margin: 0,
          },
        ],

        tabBarStyle: [
          {
            backgroundColor: COLORS.secondary,
            // height: PERCENT[20],
            // borderRadius: 50,
          },
          null,
        ],

        tabBarIcon: ({ color, focused }) => {
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
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, [path]);

          return focused ? (
            <HStack alignItems="center">
              {!isAnimating && (
                <Animated.View
                  style={{
                    opacity: opacity,
                    // backgroundColor: "gray",
                  }}
                >
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
            </HStack>
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
            if (path !== "home") {
              e.preventDefault();
              setIsAnimating(true);
              setOpacity(new Animated.Value(0));
              setPath("home");
              navigation.navigate("Home");
            }
          },
        })}
      />
      <Tab.Screen
        name="Buy"
        component={Purchase}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (path !== "buy") {
              e.preventDefault();
              setIsAnimating(true);
              setOpacity(new Animated.Value(0));
              setPath("buy");
              navigation.navigate("Buy");
            }
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (path !== "profile") {
              e.preventDefault();
              setIsAnimating(true);
              setOpacity(new Animated.Value(0));
              setPath("profile");
              navigation.navigate("Profile");
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}
