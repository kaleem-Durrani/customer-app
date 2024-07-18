import { View, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import HistoryTopTabNavigator from "./HistoryTopTabNavigator";
import TopRibbon from "../../components/TopRibbon";

import customerApis from "../../api/customer";
import useApi from "../../hooks/useApi";
import MyToast from "../../components/MyToast";
import useFundsTransferHistory from "../../hooks/useFundsTransferHistory";

// all 3 api calls must be refactored into hooks where history is fetched
// refreshed, error and loading is avaliable.

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
