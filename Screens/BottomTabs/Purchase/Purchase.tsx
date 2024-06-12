import {
  View,
  Text,
  HStack,
  Image,
  VStack,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import ScrollBadges from "./components/ScrollBadges";
import MyInput from "./components/MyInput";
import ImageButton from "./components/ImageButton";

const Purchase = () => {
  const [amount, setAmount] = useState("");
  const [litres, setLitres] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [petrolPrice] = useState(280);
  const [selectedFuel, setSelectedFuel] = useState("");

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

  const handleBadgePress = (value: string, isAmount: boolean) => {
    if (isAmount) {
      handleAmountChange(value.toString());
    } else {
      handleLitresChange(value.toString());
    }
  };

  const amountList = [100, 300, 500, 1000, 2000, 3000, 5000, 7000, 8000, 10000];
  const litreList = [1, 2, 3, 5, 7, 8, 10, 11, 12, 15, 18, 20, 25, 30];

  return (
    <View flex={1} bg={COLORS.primary} pt={"$8"} px={"$4"}>
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
                borderColor:
                  selectedFuel === "petrol" ? COLORS.tertiary : "gray",
                backgroundColor:
                  selectedFuel === "petrol" ? COLORS.primary : COLORS.secondary,
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/petrol.png")}
              alt="petrol"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedFuel("diesel")}
            style={[
              styles.fuelButton,
              {
                borderColor:
                  selectedFuel === "diesel" ? COLORS.tertiary : "gray",
                backgroundColor:
                  selectedFuel === "diesel" ? COLORS.primary : COLORS.secondary,
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/diesel.png")}
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
              source={require("../../../assets/images/cng.png")}
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

      {/* four images above the buy button for payment type selection */}
      <VStack bg={COLORS.primary} mt={"$2"} elevation={5} borderRadius={20}>
        <HStack justifyContent="space-evenly" mx={"$2"} mt={"$6"}>
          <ImageButton
            image={require("../../../assets/images/cash.png")}
            alt={"cash"}
            title={"cash"}
            myNumber={1}
            selectedNumber={selectedPaymentMethod}
            setSelectedNumber={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/app.png")}
            alt={"app"}
            title={"App"}
            myNumber={2}
            selectedNumber={selectedPaymentMethod}
            setSelectedNumber={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/bonusPoints.png")}
            alt={"points"}
            title={"Points"}
            myNumber={3}
            selectedNumber={selectedPaymentMethod}
            setSelectedNumber={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/app+points.png")}
            alt={"app+points"}
            title={"App + Points"}
            myNumber={4}
            selectedNumber={selectedPaymentMethod}
            setSelectedNumber={setSelectedPaymentMethod}
          />
        </HStack>

        {/* buy button */}
        <Button backgroundColor={COLORS.tertiary} mx={"$7"} my={"$5"}>
          <ButtonText>Buy Now!</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  fuelButton: {
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    padding: PERCENT[1],
  },
});
