import { View, Text, Image } from "@gluestack-ui/themed";
// import { Image } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/Constants";

const ButtonCard = ({ image, title }: any) => {
  return (
    <View
      alignItems="center"
      bg={COLORS.secondary}
      w={"30%"}
      mt={"$3"}
      p={"$3"}
      borderRadius={15}
      elevation={4}
    >
      <Image size="md" alt="something" source={image} />
      <Text alignSelf="center">{title}</Text>
    </View>
  );
};

export default ButtonCard;
