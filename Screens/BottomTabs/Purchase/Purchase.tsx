import React, { useState } from "react";
import {
  View,
  HStack,
  VStack,
  Button,
  ButtonText,
  Text,
  Center,
} from "@gluestack-ui/themed";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../Constants/Constants";
import ImageButton from "./components/ImageButton";
import FuelTypeAmountCard from "./components/FuelTypeAmountCard";
import MyToast from "../../../components/MyToast";
import QRModal from "./components/QRModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../../../auth/useAuth";
import { NetworkStatusBadge } from "../../../components/NetworkBadge";

interface QRDictionary {
  selectedFuel: string;
  amount: string;
  litres: string;
  selectedPaymentMethod: string;
  userId: any;
}

const Purchase = () => {
  const { user } = useAuth();

  const toast = MyToast();
  const [showingToast, setShowingToast] = useState(false);

  // QR Modal control state
  const [showModal, setShowModal] = useState(false);
  const [QRDictionary, setQRDictionary] = useState<QRDictionary | null>(null);

  const [amount, setAmount] = useState("");
  const [litres, setLitres] = useState("");

  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const showErrorToast = (title: string, description: string) => {
    if (showingToast) return;

    toast.show("accent", "error", title, description, 5000);
    setShowingToast(true);
    setTimeout(() => setShowingToast(false), 4500);
  };

  const onBuyPress = () => {
    if (!selectedFuel) {
      return showErrorToast(
        "Fuel Type Not Selected",
        "Please select the type of fuel you wish to purchase"
      );
    }
    if (!amount || !litres) {
      return showErrorToast(
        "Amount or Litres Not Selected",
        "Please select the amount for the fuel you want to buy or the number of litres"
      );
    }
    if (!selectedPaymentMethod) {
      return showErrorToast(
        "Payment Method Not Selected",
        "Please select one of the four payment methods at the bottom of the screen"
      );
    }

    // all requirements fulfilled
    toast.show(
      "accent",
      "success",
      "All required Info Given",
      `You wish to buy ${selectedFuel} of ${amount} amount and ${litres} litres. Your payment method is ${selectedPaymentMethod}.`,
      5000
    );

    const myDictionary: QRDictionary = {
      selectedFuel,
      amount,
      litres,
      selectedPaymentMethod,
      userId: user?.userId,
    };

    setQRDictionary(myDictionary);
    setShowModal(true);
  };

  return (
    <View flex={1} bg={COLORS.primary} pt={"$1"} px={"$4"}>
      <NetworkStatusBadge />
      {/* The top card of the screen containing the fuel type selection and form controls for the amount and number of litres */}
      <FuelTypeAmountCard
        selectedFuel={selectedFuel}
        setSelectedFuel={setSelectedFuel}
        amount={amount}
        setAmount={setAmount}
        litres={litres}
        setLitres={setLitres}
      />

      {/* four images above the buy button for payment type selection */}
      <VStack bg={COLORS.primary} mt={"$2"} elevation={2} borderRadius={20}>
        <HStack
          justifyContent="space-evenly"
          mx={"$2"}
          mt={"$6"}
          minHeight={"$1/6"}
        >
          <ImageButton
            image={require("../../../assets/images/cash.png")}
            alt={"cash"}
            title={"Cash"}
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

          {/* <ImageButton
            image={require("../../../assets/images/bonusPoints.png")}
            alt={"points"}
            title={"Points"}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />

          <ImageButton
            image={require("../../../assets/images/app_points.png")}
            alt={"app+points"}
            title={"App + Points"}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          /> */}
        </HStack>

        {/* Buy button */}

        <TouchableOpacity>
          <Button
            backgroundColor={COLORS.tertiary}
            mx={"$7"}
            my={"$5"}
            onPress={onBuyPress}
          >
            <ButtonText>Buy Now!</ButtonText>
          </Button>
        </TouchableOpacity>
      </VStack>
      <QRModal
        showModal={showModal}
        setShowModal={setShowModal}
        QRDictionary={QRDictionary}
      />
    </View>
  );
};

export default Purchase;
