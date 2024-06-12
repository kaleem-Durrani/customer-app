import { View, Text, Image } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../../Constants/Constants";

const ImageButton = ({
  image,
  alt,
  title,
  myNumber,
  selectedNumber,
  setSelectedNumber,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginBottom: "2%",
        borderRadius: 20,
      }}
      onPress={() => setSelectedNumber(myNumber)}
    >
      <Image
        backgroundColor={
          selectedNumber === myNumber ? COLORS.secondary : "transparent"
        }
        alt={alt}
        source={image}
        size={selectedNumber === myNumber ? "md" : "sm"}
        borderWidth={1}
        borderColor={selectedNumber === myNumber ? COLORS.tertiary : "gray"}
        borderRadius={15}
      />
      <Text
        size="xs"
        color={selectedNumber === myNumber ? COLORS.tertiary : "gray"}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageButton;
