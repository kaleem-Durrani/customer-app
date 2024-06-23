import { View, Text, Image } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../../Constants/Constants";

const ImageButton = ({
  image,
  alt,
  title,
  myNumber,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginBottom: "2%",
        borderRadius: 20,
      }}
      onPress={() => setSelectedPaymentMethod(alt)}
    >
      <Image
        backgroundColor={
          selectedPaymentMethod === myNumber ? COLORS.secondary : "transparent"
        }
        alt={alt}
        source={image}
        size={selectedPaymentMethod === alt ? "md" : "sm"}
        borderWidth={1}
        borderColor={selectedPaymentMethod === alt ? COLORS.tertiary : "gray"}
        borderRadius={15}
      />
      <Text
        size="xs"
        color={selectedPaymentMethod === alt ? COLORS.tertiary : "gray"}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageButton;
