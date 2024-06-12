import { View, Text, HStack, VStack, Image } from "@gluestack-ui/themed";
import React from "react";
import ButtonCard from "./components/ButtonCard";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }: any) => {
  return (
    <View flex={1} pt={"$8"} px={"$4"} bg={COLORS.primary}>
      <Text>Hello Nick</Text>
      <Text>Good Morning</Text>

      <View
        borderRadius={20}
        bg={"$trueGray400"}
        overflow="hidden"
        elevation={5}
      >
        <View bg={COLORS.secondary} borderRadius={20} elevation={6}>
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

        <HStack justifyContent="space-evenly">
          <View
            my={"$2"}
            p={"$3"}
            px={"$4"}
            alignItems="center"
            bg="$trueGray300"
            borderRadius={"$2xl"}
            elevation={5}
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
            my={"$2"}
            p={"$3"}
            px={"$5"}
            alignItems="center"
            bg="$trueGray300"
            borderRadius={"$2xl"}
            elevation={5}
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
            my={"$2"}
            p={"$3"}
            px={"$5"}
            alignItems="center"
            bg="$trueGray300"
            borderRadius={"$2xl"}
            elevation={5}
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

      <HStack justifyContent="space-evenly">
        <ButtonCard
          title={"  Map Locator"}
          image={require("../../../assets/images/map.png")}
          onPress={() => navigation.navigate("MapLocator")}
        />
        <ButtonCard
          title={"Loyalty Screen"}
          image={require("../../../assets/images/gift.png")}
          onPress={() => navigation.navigate("LoyaltyScreen")}
        />
        <ButtonCard
          title={"FAQs"}
          image={require("../../../assets/images/faq.png")}
          onPress={() => navigation.navigate("FAQs")}
        />
      </HStack>
    </View>
  );
};

export default Home;
