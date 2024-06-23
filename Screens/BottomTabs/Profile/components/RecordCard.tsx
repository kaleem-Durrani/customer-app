import { View, Text, VStack, Image } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";

const RecordCard = ({ image, amount, title }: any) => {
  return (
    <VStack
      // alignItems="center"
      // bg={COLORS.tertiary}
      w={"30%"}
      mt={"$3"}
      borderRadius={15}
      elevation={3}
      overflow="hidden"
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={[-1, 1]}
        end={[-1, 0]}
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: COLORS.tertiary,
          padding: PERCENT[2],
        }}
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
      </LinearGradient>
    </VStack>
  );
};

export default RecordCard;
