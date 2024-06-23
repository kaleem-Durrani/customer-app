import { View, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const InfoNavCard = ({ navigation }: any) => {
  return (
    <View
      borderRadius={20}
      bg={COLORS.primary}
      overflow="visible"
      elevation={5}
    >
      <View bg={COLORS.secondary} borderRadius={20} elevation={6}>
        <HStack justifyContent="space-around">
          <VStack
            p={"$2"}
            m={"$2"}
            borderRadius={10}
            borderWidth={1}
            borderColor="lightgray"
            alignSelf="center"
            alignItems="center"
            bg={COLORS.secondary}
            elevation={5}
          >
            <Text size="xl">Balance</Text>
            <Divider />
            <Text size="xl" color={COLORS.activeText}>
              1000
            </Text>
          </VStack>

          <VStack
            p={"$2"}
            px={"$4"}
            m={"$2"}
            borderRadius={10}
            borderWidth={1}
            borderColor="lightgray"
            alignSelf="center"
            alignItems="center"
            bg={COLORS.secondary}
            elevation={5}
          >
            <Text size="xl">Points</Text>
            <Divider />
            <Text color={COLORS.activeText} size="xl">
              100
            </Text>
          </VStack>
        </HStack>
        <Divider />

        <VStack
          p={"$2"}
          m={"$2"}
          borderRadius={10}
          borderWidth={1}
          borderColor="lightgray"
          alignSelf="center"
          alignItems="center"
          bg={COLORS.secondary}
          elevation={5}
        >
          <Text size="xl">Fuel Price</Text>

          <Text
            borderRadius={10}
            borderWidth={1}
            borderColor={COLORS.tertiary}
            color={COLORS.activeText}
            size="xl"
            p={"$1"}
            m={"$1"}
          >
            280 Rs
          </Text>
        </VStack>
      </View>

      <HStack justifyContent="space-evenly" mt={"$2"}>
        <View
          //   my={"$2"}
          p={"$2"}
          px={"$4"}
          alignItems="center"
          bg={`${COLORS.tertiary}17`}
          borderRadius={"$2xl"}
          mb={"$1"}
          //   elevation={5}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Transfer")}>
            <FontAwesome
              name="refresh"
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
          <Text color={COLORS.tertiary}>Transfer</Text>
        </View>

        <View
          // bg="gray"
          //   my={"$2"}
          p={"$2"}
          px={"$5"}
          alignItems="center"
          bg={`${COLORS.tertiary}17`}
          borderRadius={"$2xl"}
          mb={"$1"}

          //   elevation={5}
        >
          <TouchableOpacity onPress={() => navigation.navigate("TopUp")}>
            <FontAwesome
              name="arrow-circle-o-up"
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
          <Text color={COLORS.tertiary}>Top up</Text>
        </View>
        <View
          // bg="gray"
          //   my={"$2"}
          p={"$2"}
          px={"$5"}
          alignItems="center"
          bg={`${COLORS.tertiary}17`}
          borderRadius={"$2xl"}
          mb={"$1"}

          //   elevation={5}
        >
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <FontAwesome
              name="history"
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
          <Text color={COLORS.tertiary}>History</Text>
        </View>
      </HStack>
    </View>
  );
};

export default InfoNavCard;
