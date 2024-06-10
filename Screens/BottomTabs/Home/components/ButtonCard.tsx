import { View, Text, Image } from "@gluestack-ui/themed";
// import { Image } from "react-native";
import React from "react";

const ButtonCard = ({ image, title }: any) => {
  return (
    <View
      alignItems="center"
      w={"30%"}
      mt={"$3"}
      p={"$3"}
      borderRadius={10}
      elevation={2}
      bg="white"
    >
      <Image size="md" alt="something" source={image} />
      <Text alignSelf="center">{title}</Text>
    </View>
  );
};

export default ButtonCard;
