import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../Constants/Constants";
import TopRibbon from "../../../components/TopRibbon";

const PersonalDetails = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Personal Details"} />
    </View>
  );
};

export default PersonalDetails;
