import { View, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const InfoNavCard = ({ navigation, balance, points }: any) => {
  return (
    <View
      borderRadius={20}
      bg={COLORS.primary}
      overflow="visible"
      elevation={2}
      m={"$2"}
      mt={"$5"}
    >
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          borderRadius: 20,
          padding: PERCENT[3],
          elevation: 2,
        }}
      >
        <HStack justifyContent="space-between" gap={"$3"}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={[1, 0]}
            end={[0.3, 1]}
            style={{
              borderRadius: 10,
              flex: 1,
              paddingLeft: PERCENT[2],
            }}
          >
            <Text size="lg" color={COLORS.text}>
              Balance
            </Text>

            <Text ml={"$2"} size="md" color={COLORS.activeText}>
              {balance}
            </Text>
            <Divider my={"$1"} />
            {/* <Text size="lg" color={COLORS.text}>
              Points
            </Text>
            <Text ml={"$2"} size="md" color={COLORS.activeText}>
              {points}
            </Text> */}
          </LinearGradient>

          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={[1, 0]}
            end={[0.4, 1]}
            style={{
              borderRadius: 10,
              alignItems: "center",
              flex: 1,
              // elevation: 5,
            }}
          >
            <Text size="lg" color={COLORS.text}>
              Fuel Price
            </Text>
            <Text
              borderRadius={10}
              borderWidth={1}
              borderColor={COLORS.tertiary}
              color={COLORS.activeText}
              size="lg"
              p={"$2"}
              mt={"$2"}
            >
              280 Rs
            </Text>
          </LinearGradient>
        </HStack>
      </LinearGradient>

      <HStack justifyContent="space-evenly" mt={"$4"}>
        {[
          { name: "refresh", label: "Transfer", route: "Transfer" },
          { name: "arrow-circle-o-up", label: "Top up", route: "TopUp" },
          { name: "history", label: "History", route: "History" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
            style={{
              alignItems: "center",
              padding: 10,
              marginHorizontal: 5,
            }}
          >
            <FontAwesome
              name={item.name}
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
            <Text color={COLORS.tertiary}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </HStack>
    </View>
  );
};

export default InfoNavCard;
