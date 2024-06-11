import { View, Text, VStack, Image } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../../Constants/Constants";

const RecordCard = ({ image, amount, title }: any) => {
  return (
    <VStack
      alignItems="center"
      bg={COLORS.secondary}
      w={"30%"}
      mt={"$3"}
      p={"$3"}
      borderRadius={15}
      elevation={3}
    >
      <Image source={image} alt="something" size="xs" />
      <Text
        color={COLORS.tertiary}
        borderWidth={1}
        borderColor={COLORS.tertiary}
        px={"$2"}
        mt={"$2"}
        fontWeight="bold"
      >
        {amount}
      </Text>
      <Text color="gray" size="xs" mt={"$1"}>
        {title}
      </Text>
    </VStack>
  );
};

export default RecordCard;
