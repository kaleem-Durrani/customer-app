import { View, Text, Image } from "@gluestack-ui/themed";
// import { Image } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const ButtonCard = ({ image, title, onPress }: any) => {
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary]}
      start={[0, 1]}
      end={[1, 0]}
      style={{
        width: "31%",
        borderRadius: 20,
        elevation: 1,
        backgroundColor: COLORS.primary,
        overflow: "hidden",
      }}
    >
      <View
        alignItems="center"
        // bg={COLORS.secondary}
        w={"100%"}
        // mt={"$3"}
        p={"$3"}
        // elevation={4}
      >
        <TouchableOpacity onPress={onPress}>
          <Image size="sm" alt="something" source={image} />
        </TouchableOpacity>
        <Text size="xs" alignSelf="center">
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default ButtonCard;
