import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import TopRibbon from "../../components/TopRibbon";

const Transfer = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Transfer Funds"} />
    </View>
  );
};

export default Transfer;
