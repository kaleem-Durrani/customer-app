import { View, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import React from "react";
import ButtonCard from "./components/ButtonCard";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../Constants/Constants";

const Home = () => {
  // const giftImage = require("../../../images/map.png");

  // console.log(giftImage);

  return (
    <View flex={1} pt={"$8"} px={"$4"} bg={COLORS.primary}>
      <Text>Hello Nick</Text>
      <Text>Good Morning</Text>

      <View borderRadius={20} bg={"$trueGray800"}>
        <View bg={COLORS.secondary} borderRadius={20}>
          <HStack justifyContent="space-around">
            <VStack>
              <Text>Balance</Text>
              <Text>1000</Text>
            </VStack>
            <VStack>
              <Text>Points</Text>
              <Text>100</Text>
            </VStack>
          </HStack>

          <VStack alignItems="center">
            <Text>Fuel Price</Text>
            <Text>280 Rs</Text>
          </VStack>
        </View>

        <HStack justifyContent="space-around">
          <View p={"$3"} px={"$6"} alignItems="center" mb={"$1"}>
            <FontAwesome
              name="refresh"
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
            <Text color={COLORS.tertiary}>Transfer</Text>
          </View>
          <View
            // bg="gray"
            p={"$3"}
            px={"$6"}
            alignItems="center"
            borderLeftWidth={8}
            borderBottomWidth={8}
            borderColor={COLORS.secondary}
            borderBottomLeftRadius={10}
            mb={"$1"}
          >
            <FontAwesome
              name="arrow-circle-o-up"
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
            <Text color={COLORS.tertiary}>Top up</Text>
          </View>
          <View
            // bg="gray"
            p={"$3"}
            px={"$6"}
            alignItems="center"
            borderLeftWidth={8}
            borderBottomWidth={8}
            borderColor={COLORS.secondary}
            borderBottomLeftRadius={10}
            mb={"$1"}
          >
            <FontAwesome
              name="history"
              size={PERCENT[10]}
              color={COLORS.tertiary}
            />
            <Text color={COLORS.tertiary}>History</Text>
          </View>
        </HStack>
      </View>

      <HStack justifyContent="space-evenly">
        <ButtonCard
          title={"  Map Locator"}
          image={require("../../../assets/images/map.png")}
        />
        <ButtonCard
          title={"Loyalty Screen"}
          image={require("../../../assets/images/gift.png")}
        />
        <ButtonCard
          title={"FAQs"}
          image={require("../../../assets/images/faq.png")}
        />
      </HStack>
    </View>
  );
};

export default Home;
