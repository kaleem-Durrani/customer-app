import {
  View,
  Text,
  HStack,
  VStack,
  Image,
  Divider,
} from "@gluestack-ui/themed";
import React from "react";
import ButtonCard from "./components/ButtonCard";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }: any) => {
  return (
    <View flex={1} pt={"$8"} px={"$4"} bg={COLORS.primary}>
      <Text fontWeight="bold" size="3xl" color={COLORS.activeText}>
        Hello Nick
      </Text>
      <Text mt={-6} mb={"$3"} size="sm" color="gray">
        Good Morning
      </Text>

      <View borderRadius={20} bg={"#EEEEEE"} overflow="hidden" elevation={5}>
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

        <HStack justifyContent="space-evenly" mt={"$5"}>
          <View
            my={"$2"}
            p={"$3"}
            px={"$4"}
            alignItems="center"
            bg="#F3F7ECdd"
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
            bg="#F3F7ECdd"
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
            bg="#F3F7ECdd"
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

      <HStack justifyContent="space-evenly" mt={"$5"}>
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
