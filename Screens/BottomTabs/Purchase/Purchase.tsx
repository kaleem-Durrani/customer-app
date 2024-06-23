import { View, HStack, VStack, Button, ButtonText } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { COLORS } from "../../../Constants/Constants";
import ImageButton from "./components/ImageButton";
import FuelTypeAmountCard from "./components/FuelTypeAmountCard";
import MyToast from "../../../components/MyToast";

const Purchase = () => {
  const toast = MyToast();
  const [showingToast, setShowingToast] = useState(false);

  const [amount, setAmount] = useState("");
  const [litres, setLitres] = useState("");

  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const showErrorToast = (title: string, description: string) => {
    toast.show("accent", "error", title, description, 5000);
    setShowingToast(true);
    setTimeout(() => {
      setShowingToast(false);
    }, 4500);
  };

  const onBuyPress = () => {
    if (!selectedFuel) {
      if (showingToast) return;
      return showErrorToast(
        "Fuel Type Not Selected",
        "Please select the type of fuel you widh to purchase"
      );
    }
    if (!amount || !litres) {
      if (showingToast) return;
      return showErrorToast(
        "Amount or Litres Not Selected",
        "Please select the amount for the fuel you want to buy or the number of litres"
      );
    }
    if (!selectedPaymentMethod) {
      if (showingToast) return;
      return showErrorToast(
        "Payment Method Not Selected",
        "Please select one of the four payment mehods at the bottom of the screen"
      );
    }
    // all requirements fulfilled
    toast.show(
      "accent",
      "success",
      "All required Info Given",
      `You wish to buy ${selectedFuel} of ${amount} amount and ${litres} litres your payment method is ${selectedPaymentMethod}`,
      5000
    );
  };

  return (
    <View flex={1} bg={COLORS.primary} pt={"$1"} px={"$4"}>
      {/* 
      the top card of the screen containing the fuel type selection
      and form controls for the amount ano no of litres
       */}
      <FuelTypeAmountCard
        selectedFuel={selectedFuel}
        setSelectedFuel={setSelectedFuel}
        amount={amount}
        setAmount={setAmount}
        litres={litres}
        setLitres={setLitres}
      />

      {/* four images above the buy button for payment type selection */}
      <VStack bg={COLORS.primary} mt={"$2"} elevation={5} borderRadius={20}>
        <HStack justifyContent="space-evenly" mx={"$2"} mt={"$6"}>
          <ImageButton
            image={require("../../../assets/images/cash.png")}
            alt={"cash"}
            title={"cash"}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/app.png")}
            alt={"app"}
            title={"App"}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/bonusPoints.png")}
            alt={"points"}
            title={"Points"}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/app+points.png")}
            alt={"app+points"}
            title={"App + Points"}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </HStack>

        {/* buy button */}
        <Button
          backgroundColor={COLORS.tertiary}
          mx={"$7"}
          my={"$5"}
          onPress={onBuyPress}
        >
          <ButtonText>Buy Now!</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

export default Purchase;
