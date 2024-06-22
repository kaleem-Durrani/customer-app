import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const TopRibbon = ({ navigation, title }: any) => {
  return (
    <View
      flexDirection="row"
      bg={COLORS.secondary}
      height={"$24"}
      alignItems="center"
      pl={"$5"}
      pr={"$12"}
      justifyContent="space-between"
      borderBottomRightRadius={PERCENT[8]}
      borderBottomLeftRadius={PERCENT[8]}
      elevation={5}
      zIndex={1000}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          padding: PERCENT[1],
          borderWidth: 2,
          borderColor: COLORS.tertiary,
          borderRadius: PERCENT[100],
        }}
      >
        <FontAwesome
          style={{
            textShadowColor: "gray",
            textShadowOffset: { width: 2, height: 4 },
            textShadowRadius: 9,
          }}
          name="long-arrow-left"
          size={PERCENT[10]}
          color={COLORS.tertiary}
        />
      </TouchableOpacity>
      <Text
        style={{
          textShadowColor: "gray",
          textShadowOffset: { width: 1, height: 4 },
          textShadowRadius: 9,
        }}
        size="2xl"
        fontWeight="bold"
      >
        {title}
      </Text>
    </View>
  );
};

export default TopRibbon;
