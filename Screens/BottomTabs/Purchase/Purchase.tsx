import {
  View,
  Text,
  HStack,
  Image,
  VStack,
  Input,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  AlertCircleIcon,
  ScrollView,
  FormControlErrorText,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { COLORS } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native";

const Purchase = () => {
  const [amount, setAmount] = useState("");
  const [litres, setLitres] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [petrolPrice] = useState(280);

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

        <VStack m={"$3"}>
          <HStack justifyContent="center" gap={"$10"} alignItems="center">
            <Text>Price: </Text>
            <Text borderWidth={1} borderRadius={10} p={"$2"}>
              {petrolPrice} / litre
            </Text>
          </HStack>

          {myInput(
            amount,
            handleAmountChange,
            "Enter Amount",
            "Enter the amount"
          )}

          {scrollBadges(amountList, (value: string) =>
            handleBadgePress(value, true)
          )}

          {myInput(
            litres,
            handleLitresChange,
            "Enter Litres",
            "Enter the number of litres"
          )}

          {scrollBadges(litreList, (value: string) =>
            handleBadgePress(value, false)
          )}
        </VStack>
      </View>
      <VStack bg={COLORS.primary} mt={"$2"} elevation={5} borderRadius={20}>
        <HStack justifyContent="space-evenly" mx={"$2"} mt={"$6"}>
          {imageButton(
            require("../../../assets/images/cash.png"),
            "cash",
            "Cash",
            1,
            selectedPaymentMethod,
            setSelectedPaymentMethod
          )}
          {imageButton(
            require("../../../assets/images/app.png"),
            "app",
            "App",
            2,
            selectedPaymentMethod,
            setSelectedPaymentMethod
          )}
          {imageButton(
            require("../../../assets/images/bonusPoints.png"),
            "points",
            "Points",
            3,
            selectedPaymentMethod,
            setSelectedPaymentMethod
          )}
          {imageButton(
            require("../../../assets/images/app+points.png"),
            "app+points",
            " App +\nPoints",
            4,
            selectedPaymentMethod,
            setSelectedPaymentMethod
          )}
        </HStack>
        <Button backgroundColor={COLORS.tertiary} mx={"$7"} my={"$7"}>
          <ButtonText>Buy Now!</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

export default Purchase;

const imageButton = (
  image: any,
  alt: string,
  title: string,
  myNumber: Number,
  selectedNumber: Number,
  setSelectedNumber: any
) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",

        marginBottom: "2%",
        borderRadius: 20,
      }}
      onPress={() => setSelectedNumber(myNumber)}
    >
      <Image
        backgroundColor={
          selectedNumber === myNumber ? COLORS.secondary : "transparent"
        }
        alt={alt}
        source={image}
        size="sm"
        borderWidth={1}
        borderColor={selectedNumber === myNumber ? COLORS.tertiary : "gray"}
        borderRadius={15}
      />
      <Text color={selectedNumber === myNumber ? COLORS.tertiary : "gray"}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Input fields component
const myInput = (
  value: any,
  onChange: any,
  placeholder: string,
  errorText: string
) => {
  return (
    <FormControl
      m={"$3"}
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      isRequired={true}
    >
      <Input variant="rounded" size="lg">
        <InputField
          type="text"
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric" // This will open the numeric keyboard
          inputMode="numeric" // This ensures only numeric input is accepted
        />
      </Input>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

// Horizontal scroll list component
const scrollBadges = (list: any, onPressFunction: any) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} mt={"$3"}>
      <HStack>
        {list.map((listItem: any) => (
          <View
            key={listItem}
            minWidth={"$11"}
            bg={COLORS.secondary}
            borderRadius={15}
            m={"$2"}
            elevation={5}
            alignItems="center"
            justifyContent="center"
          >
            <TouchableOpacity onPress={() => onPressFunction(listItem)}>
              <Text p={"$3"} color={COLORS.tertiary}>
                {listItem}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </HStack>
    </ScrollView>
  );
};
