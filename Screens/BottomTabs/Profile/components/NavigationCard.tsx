import { View, Text, HStack } from "@gluestack-ui/themed";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const NavigationCard = ({ name, title, onPress }: any) => {
  return (
    <View
      bg={COLORS.secondary}
      elevation={5}
      borderRadius={20}
      p={"$3"}
      mx={"$2"}
      my={"$1"}
    >
      <TouchableOpacity onPress={onPress}>
        <HStack width={"100%"} alignItems="center">
          <View bg={`${COLORS.tertiary}30`} p={"$3"} borderRadius={"$full"}>
            <Entypo
              name={name}
              size={PERCENT[10]}
              color={COLORS.tertiary}
              style={{ flex: 2 }}
            />
          </View>
          <Text fontWeight="bold" size="lg" flex={6} ml={"$4"}>
            {title}
          </Text>
          <Entypo
            style={{ flex: 1 }}
            name="chevron-right"
            size={PERCENT[8]}
            color={COLORS.tertiary}
          />
        </HStack>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationCard;
