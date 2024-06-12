import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../Constants/Constants";
import TopRibbon from "../../components/TopRibbon";

const MapLocator = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Map Locator"} />
    </View>
  );
};

export default MapLocator;
