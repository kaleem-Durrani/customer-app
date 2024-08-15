import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../Constants/Constants";
import { NetworkStatusBadge } from "../../components/NetworkBadge";
import TopRibbon from "../../components/TopRibbon";

const LoyaltyScreen = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Loyalty Screen"} />
    </View>
  );
};

export default LoyaltyScreen;
