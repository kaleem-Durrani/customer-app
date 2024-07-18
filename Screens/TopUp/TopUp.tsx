import { View, Text, Input, InputField } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import TopRibbon from "../../components/TopRibbon";

const TopUp = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Top Up"} />
    </View>
  );
};

export default TopUp;
