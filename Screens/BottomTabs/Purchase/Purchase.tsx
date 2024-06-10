import {
  View,
  Text,
  HStack,
  Image,
  VStack,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../Constants/Constants";

const Purchase = () => {
  return (
    <View flex={1} bg={COLORS.primary} pt={"$8"} px={"$4"}>
      <View bg="lightcyan" elevation={5} borderRadius={20}>
        <HStack
          bg={COLORS.secondary}
          elevation={5}
          p={"$3"}
          borderRadius={20}
          justifyContent="space-evenly"
        >
          <Image
            source={require("../../../assets/images/petrol.png")}
            alt="petrol"
          />
          <Image
            source={require("../../../assets/images/diesel.png")}
            alt="diesel"
          />
          <Image source={require("../../../assets/images/cng.png")} alt="cng" />
        </HStack>

        <VStack>
          <HStack justifyContent="center" gap={"$10"} alignItems="center">
            <Text>Price: </Text>
            <Text borderWidth={1} borderRadius={10} p={"$2"}>
              280 / litre
            </Text>
          </HStack>
        </VStack>
      </View>
    </View>
  );
};

export default Purchase;
