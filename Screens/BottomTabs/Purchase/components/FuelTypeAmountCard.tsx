import {
  View,
  Text,
  HStack,
  Image,
  VStack,
  Divider,
} from "@gluestack-ui/themed";
import React, { useState, useEffect, useRef } from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScrollBadges from "./ScrollBadges";
import MyInput from "./MyInput";
import { StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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

  const petrolSizeAnim = useRef(new Animated.Value(0)).current;
  const dieselSizeAnim = useRef(new Animated.Value(0)).current;
  const cngSizeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateSize(petrolSizeAnim, selectedFuel === "petrol" ? 1 : 0);
    animateSize(dieselSizeAnim, selectedFuel === "diesel" ? 1 : 0);
    animateSize(cngSizeAnim, selectedFuel === "cng" ? 1 : 0);
  }, [selectedFuel]);

  const animateSize = (animValue, toValue) => {
    Animated.timing(animValue, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  };

  const getSizeStyle = (animValue) => {
    return {
      width: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [PERCENT[17], PERCENT[22]],
      }),
      height: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [PERCENT[17], PERCENT[22]],
      }),
    };
  };

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
    <View bg={COLORS.primary} elevation={2} borderRadius={20}>
      <LinearGradient
        colors={[
          COLORS.secondary,
          COLORS.primary,
          COLORS.secondary,
          COLORS.primary,
          COLORS.secondary,
        ]}
        start={[0, -1]}
        end={[1, 1]}
        style={{
          backgroundColor: "white",
          elevation: 5,
          overflow: "hidden",
          borderRadius: 20,
          // borderBottomRightRadius: PERCENT[8],
          // borderBottomLeftRadius: PERCENT[8],
          // zIndex: 1000,
        }}
      >
        <HStack
          // bg={COLORS.secondary}
          // elevation={4}
          p={"$2"}
          // borderRadius={20}
          justifyContent="space-evenly"
          minHeight={"$32"}
        >
          <TouchableOpacity
            onPress={() => setSelectedFuel("petrol")}
            style={[
              styles.fuelButton,
              {
                borderColor:
                  selectedFuel === "petrol" ? COLORS.tertiary : "gray",
                backgroundColor:
                  selectedFuel === "petrol" ? COLORS.primary : "#f7f7f7",
              },
            ]}
          >
            <Animated.Image
              style={[styles.image, getSizeStyle(petrolSizeAnim)]}
              source={require("../../../../assets/images/petrol.png")}
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
                  selectedFuel === "diesel" ? COLORS.primary : "#f7f7f7",
              },
            ]}
          >
            <Animated.Image
              style={[styles.image, getSizeStyle(dieselSizeAnim)]}
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
                  selectedFuel === "cng" ? COLORS.primary : "#f7f7f7",
              },
            ]}
          >
            <Animated.Image
              style={[styles.image, getSizeStyle(cngSizeAnim)]}
              source={require("../../../../assets/images/cng.png")}
              alt="cng"
            />
          </TouchableOpacity>
        </HStack>
      </LinearGradient>

      <VStack m={"$3"}>
        <HStack justifyContent="center" gap={"$10"} alignItems="center">
          <Text>Price: </Text>
          <Text borderWidth={1} borderRadius={10} p={"$2"}>
            {petrolPrice} / litre
          </Text>
        </HStack>
        {/* <Divider mt={"$3"} /> */}

        {/* amount input */}
        <HStack alignItems="center" mb={"$5"}>
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
        </HStack>

        <Divider />

        {/* litres input */}
        <HStack alignItems="center">
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
        </HStack>
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
  image: {
    resizeMode: "contain",
  },
});
