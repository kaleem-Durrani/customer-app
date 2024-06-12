import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TransactionHistory from "../../Screens/HistoryTopTabs/TransactionHistory/TransactionHistory";
import TopUpHistory from "../../Screens/HistoryTopTabs/TopUpHistory/TopUpHistory";
import FundsTransferHistory from "../../Screens/HistoryTopTabs/FundsTransferHistory/FundsTransferHistory";

const Tab = createMaterialTopTabNavigator();

const HistoryTopTabNavigator = () => {
  return (
    <Tab.Navigator>
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
