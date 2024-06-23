import { View, Text, HStack, Image, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScrollBadges from "./ScrollBadges";
import MyInput from "./MyInput";
import { StyleSheet } from "react-native";

const FuelTypeAmountCard = ({
  selectedFuel,
  setSelectedFuel,
  amount,
  setAmount,
  litres,
  setLitres,
}: any) => {
  const [petrolPrice] = useState(280);

  const amountList = [100, 300, 500, 1000, 2000, 3000, 5000, 7000, 8000, 10000];
  const litreList = [1, 2, 3, 5, 7, 8, 10, 11, 12, 15, 18, 20, 25, 30];

  //   when amount is entered to the first form control it automatically
  //   updates the litres
  const handleAmountChange = (value: any) => {
    if (value === "") {
      setLitres("");
      setAmount("");
      return;
    }
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      const litres = value / petrolPrice;
      setLitres(litres.toFixed(2));
    }
  };

  //   when a value is entered to the second form control for the litres
  //   it automatically calculates price and enteres it to the first form control
  const handleLitresChange = (value: any) => {
    if (value === "") {
      setLitres("");
      setAmount("");
      return;
    }
    if (/^\d*\.?\d*$/.test(value)) {
      setLitres(value);
      const amount = value * petrolPrice;
      setAmount(amount.toString());
    }
  };

  //  clicking the badges of either the amount or litres
  const handleBadgePress = (value: string, isAmount: boolean) => {
    if (isAmount) {
      handleAmountChange(value.toString());
    } else {
      handleLitresChange(value.toString());
    }
  };

  return (
    <View bg={COLORS.primary} elevation={5} borderRadius={20}>
      <HStack
        bg={COLORS.secondary}
        elevation={5}
        p={"$2"}
        borderRadius={20}
        justifyContent="space-evenly"
      >
        <TouchableOpacity
          onPress={() => setSelectedFuel("petrol")}
          style={[
            styles.fuelButton,
            {
              borderColor: selectedFuel === "petrol" ? COLORS.tertiary : "gray",
              backgroundColor:
                selectedFuel === "petrol" ? COLORS.primary : COLORS.secondary,
            },
          ]}
        >
          <Image
            source={require("../../../../assets/images/petrol.png")}
            alt="petrol"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedFuel("diesel")}
          style={[
            styles.fuelButton,
            {
              borderColor: selectedFuel === "diesel" ? COLORS.tertiary : "gray",
              backgroundColor:
                selectedFuel === "diesel" ? COLORS.primary : COLORS.secondary,
            },
          ]}
        >
          <Image
            source={require("../../../../assets/images/diesel.png")}
            alt="diesel"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedFuel("cng")}
          style={[
            styles.fuelButton,
            {
              borderColor: selectedFuel === "cng" ? COLORS.tertiary : "gray",
              backgroundColor:
                selectedFuel === "cng" ? COLORS.primary : COLORS.secondary,
            },
          ]}
        >
          <Image
            source={require("../../../../assets/images/cng.png")}
            alt="cng"
          />
        </TouchableOpacity>
      </HStack>

      <VStack m={"$3"}>
        <HStack justifyContent="center" gap={"$10"} alignItems="center">
          <Text>Price: </Text>
          <Text borderWidth={1} borderRadius={10} p={"$2"}>
            {petrolPrice} / litre
          </Text>
        </HStack>

        {/* amount input */}
        <MyInput
          value={amount}
          onChange={handleAmountChange}
          placeholder={"Enter Amount"}
          errorText={"Enter the amount"}
        />

        {/* quick buttons for instant input */}
        <ScrollBadges
          list={amountList}
          onPressFunction={(value: string) => handleBadgePress(value, true)}
        />

        {/* litres input */}
        <MyInput
          value={litres}
          onChange={handleLitresChange}
          placeholder={"Enter Litres"}
          errorText={"Enter the number of litres"}
        />

        {/* quick buttons for instant input */}
        <ScrollBadges
          list={litreList}
          onPressFunction={(value: string) => handleBadgePress(value, false)}
        />
      </VStack>
    </View>
  );
};

export default FuelTypeAmountCard;

const styles = StyleSheet.create({
  fuelButton: {
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    padding: PERCENT[1],
  },
});
