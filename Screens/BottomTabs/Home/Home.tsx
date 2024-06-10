import { View, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import React from "react";
import ButtonCard from "./components/ButtonCard";
import { FontAwesome } from "@expo/vector-icons";

const Home = () => {
  // const giftImage = require("../../../images/map.png");

  // console.log(giftImage);

  return (
    <View flex={1} pt={"$8"} px={"$4"} bg="white">
      <Text>Hello Nick</Text>
      <Text>Good Morning</Text>

      <View borderRadius={20} bg="#CD3CA4">
        <View bg="#D4C4E8" borderRadius={20}>
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
          <View alignItems="center">
            <FontAwesome name="refresh" size={24} color="white" />
            <Text color="white">Transfer</Text>
          </View>
          <View alignItems="center">
            <FontAwesome name="arrow-circle-o-up" size={24} color="white" />
            <Text color="white">Top up</Text>
          </View>
          <View alignItems="center">
            <FontAwesome name="history" size={24} color="white" />
            <Text color="white">History</Text>
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
