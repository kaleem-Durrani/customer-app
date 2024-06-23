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
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import InfoNavCard from "./components/InfoNavCard";

const Home = ({ navigation }: any) => {
  return (
    <View flex={1} pt={"$1"} px={"$4"} bg={COLORS.primary}>
      <Text fontWeight="bold" size="3xl" color={COLORS.activeText}>
        Hello Nick
      </Text>
      <Text mt={-6} mb={"$3"} size="sm" color="gray">
        Good Morning
      </Text>

      {/* info and navigation card */}
      <InfoNavCard navigation={navigation} />

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
