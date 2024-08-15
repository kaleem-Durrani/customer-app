import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../Constants/Constants";
import TopRibbon from "../../../components/TopRibbon";
import { NetworkStatusBadge } from "../../../components/NetworkBadge";
const PrivacyPolicy = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Privacy Policy"} />
    </View>
  );
};

export default PrivacyPolicy;
