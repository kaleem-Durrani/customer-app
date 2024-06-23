import { View, Text, HStack } from "@gluestack-ui/themed";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const NavigationCard = ({ name, title, onPress }: any) => {
  return (
    <View m={"$1"} my={"$1"}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          borderRadius: 20,
          elevation: 2,
          backgroundColor: COLORS.primary,
          overflow: "hidden",
          padding: PERCENT[3],
        }}
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
      </LinearGradient>
    </View>
  );
};

export default NavigationCard;
