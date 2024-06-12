import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../Constants/Constants";
import TopRibbon from "../../components/TopRibbon";

const FAQs = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"FAQs"} />
    </View>
  );
};

export default FAQs;
