import { View, Text, HStack } from "@gluestack-ui/themed";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../../Constants/Constants";

const NavigationCard = ({ name, title }: any) => {
  return (
    <HStack
      width={"100%"}
      bg="white"
      alignItems="center"
      p={"$3"}
      elevation={5}
      borderRadius={20}
      mx={"$2"}
      my={"$1"}
    >
      <Entypo
        name={name}
        size={PERCENT[10]}
        color={COLORS.tertiary}
        style={{ flex: 2, marginLeft: 10 }}
      />
      <Text fontWeight="bold" size="lg" flex={6}>
        {title}
      </Text>
      <Entypo
        style={{ flex: 1 }}
        name="chevron-right"
        size={PERCENT[8]}
        color={COLORS.tertiary}
      />
    </HStack>
  );
};

export default NavigationCard;
