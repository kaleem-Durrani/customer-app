import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../Constants/Constants";
import TopRibbon from "../../../components/TopRibbon";
import { NetworkStatusBadge } from "../../../components/NetworkBadge";

const CustomerSupport = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Customer Support"} />
    </View>
  );
};

export default CustomerSupport;
