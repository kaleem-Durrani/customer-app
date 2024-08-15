import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../Constants/Constants";
import TopRibbon from "../../components/TopRibbon";
import { NetworkStatusBadge } from "../../components/NetworkBadge";

const FAQs = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"FAQs"} />
    </View>
  );
};

export default FAQs;
