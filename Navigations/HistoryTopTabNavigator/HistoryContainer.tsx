import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import HistoryTopTabNavigator from "./HistoryTopTabNavigator";
import TopRibbon from "../../components/TopRibbon";

const HistoryContainer = ({ navigation }: any) => {
  return (
    <View flex={1}>
      <TopRibbon navigation={navigation} title={"History"} />
      <View my={"$1"}></View>
      <HistoryTopTabNavigator />
    </View>
  );
};

export default HistoryContainer;
