import { View, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const InfoNavCard = ({ navigation }: any) => {
  return (
    <View
      borderRadius={20}
      bg={COLORS.primary}
      overflow="visible"
      elevation={5}
      m={"$3"}
      // p={"$3"}
    >
      <LinearGradient
        colors={["#f5f7fa", "#c3cfe2"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          borderRadius: 20,
          padding: 16,
          elevation: 6,
        }}
      >
        <HStack justifyContent="space-between">
          <VStack flex={1} justifyContent="space-between">
            <LinearGradient
              colors={["#e0eafc", "#cfdef3"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{
                borderRadius: 10,
                padding: 16,
                alignItems: "center",
                marginBottom: 16,
                elevation: 5,
              }}
            >
              <Text size="lg" color={COLORS.activeText}>
                Balance
              </Text>
              {/* <Divider my={"$2"} /> */}
              <Text size="lg" color={COLORS.activeText}>
                1000
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={[1, 1]}
              end={[0, 1]}
              style={{
                borderRadius: 10,
                padding: 16,
                alignItems: "center",
                elevation: 5,
              }}
            >
              <Text size="lg" color={COLORS.activeText}>
                Points
              </Text>
              {/* <Divider my={"$2"} /> */}
              <Text size="lg" color={COLORS.activeText}>
                100
              </Text>
            </LinearGradient>
          </VStack>

          <LinearGradient
            colors={["#e0eafc", "#cfdef3"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              borderRadius: 10,
              padding: 16,
              alignItems: "center",
              flex: 1,
              marginLeft: 16,
              elevation: 5,
            }}
          >
            <Text size="lg" color={COLORS.activeText}>
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
