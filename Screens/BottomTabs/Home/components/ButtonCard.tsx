import { View, Text, Image } from "@gluestack-ui/themed";
// import { Image } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonCard = ({ image, title, onPress }: any) => {
  return (
    <View
      alignItems="center"
      bg={COLORS.secondary}
      w={"31%"}
      mt={"$3"}
      p={"$3"}
      borderRadius={15}
      elevation={4}
    >
      <TouchableOpacity onPress={onPress}>
        <Image size="md" alt="something" source={image} />
      </TouchableOpacity>
      <Text alignSelf="center">{title}</Text>
    </View>
  );
};

export default ButtonCard;
