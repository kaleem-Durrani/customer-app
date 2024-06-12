import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TransactionHistory from "../../Screens/HistoryTopTabs/TransactionHistory/TransactionHistory";
import TopUpHistory from "../../Screens/HistoryTopTabs/TopUpHistory/TopUpHistory";
import FundsTransferHistory from "../../Screens/HistoryTopTabs/FundsTransferHistory/FundsTransferHistory";
import { COLORS } from "../../Constants/Constants";

const Tab = createMaterialTopTabNavigator();

const HistoryTopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.tertiary,
        tabBarInactiveTintColor: "gray",
        tabBarPressColor: `${COLORS.tertiary}50`,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          elevation: 7,
        },

        tabBarIndicatorStyle: {
          backgroundColor: COLORS.tertiary,
        },
        tabBarLabelStyle: {
          fontWeight: "bold", // Make the labels bold
        },
      }}
    >
      <Tab.Screen name="TransactionHistory" component={TransactionHistory} />
      <Tab.Screen name="TopUpHistory" component={TopUpHistory} />
      <Tab.Screen
        name="FundsTransferHistory"
        component={FundsTransferHistory}
      />
    </Tab.Navigator>
  );
};

export default HistoryTopTabNavigator;
