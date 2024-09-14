import {
  View,
  Text,
  Button,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Progress,
  ButtonText,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";

import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { NetworkStatusBadge } from "../../components/NetworkBadge";
import TopRibbon from "../../components/TopRibbon";
import useProfile from "../../hooks/useProfile";
import customerApi from "../../api/customer";
import useApi from "../../hooks/useApi";
import { Alert } from "react-native";
const LoyaltyScreen = ({ navigation }: any) => {
  const getLoyaltyPointsApi = useApi(customerApi.getLoyaltyPoints);
  const redeemLoyaltyPointsApi = useApi(customerApi.redeemLoyaltyPoints);
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([]);
  const [points, setPoints] = useState(0);
  const [selectedPump, setSelectedPump] = useState("");

  const getLoyaltyPoints = async () => {
    await getLoyaltyPointsApi.request();
  };

  useEffect(() => {
    getLoyaltyPoints();
    console.log("loyaltyPrograms");
  }, []);

  useEffect(() => {
    if (getLoyaltyPointsApi.data) {
      setLoyaltyPrograms(getLoyaltyPointsApi.data.loyaltyPrograms);
      setSelectedPump("");
      setPoints(0);
    }
    if (getLoyaltyPointsApi.error) {
      Alert.alert("Error", "Error fetching loyalty points");
    }
  }, [getLoyaltyPointsApi.data, getLoyaltyPointsApi.error]);

  const handlePumpChange = (itemValue: string) => {
    const selectedPump = loyaltyPrograms.find(
      (pump) => pump.pumpId.name === itemValue
    );
    if (selectedPump) {
      setSelectedPump(selectedPump.pumpId.name);
      console.log(selectedPump);
      setPoints(selectedPump.points);
    }
  };

  const handleRedeem = async (itemValue: string) => {
    const selectedPump = loyaltyPrograms.find(
      (pump) => pump.pumpId.name === itemValue
    );
    await redeemLoyaltyPointsApi.request(selectedPump.pumpId._id);
  };

  useEffect(() => {
    if (redeemLoyaltyPointsApi.data) {
      Alert.alert(redeemLoyaltyPointsApi.data.message);
      getLoyaltyPoints();
    }
    if (redeemLoyaltyPointsApi.error) {
      Alert.alert("Error", "Error redeeming points");
    }
  }, [redeemLoyaltyPointsApi.data, redeemLoyaltyPointsApi.error]);

  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Loyalty Points"} />
      <NetworkStatusBadge />
      <View alignItems="center" justifyContent="center" mt={20}>
        <Select
          selectedValue={selectedPump}
          onValueChange={handlePumpChange}
          minWidth={250}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput
              placeholder="Choose Pump"
              value={selectedPump ? selectedPump : "Choose Pump"}
              onChangeText={handlePumpChange}
            />
            <SelectIcon
              as={MaterialIcons}
              name="arrow-drop-down"
              size="md"
              mr={10}
            />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {loyaltyPrograms.map((pump) => (
                <SelectItem
                  key={pump.pumpId.name}
                  label={pump.pumpId.name}
                  value={pump.pumpId.name}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Text mt={PERCENT[40]}>
          {points >= 100
            ? "Congrats! Redeem points into balance!"
            : `You can redeem after ${100 - points} more points`}
        </Text>
        <Progress
          value={points}
          size="lg"
          style={{
            width: "80%",
            height: 35,
            backgroundColor: "#F7FEE7",
            marginTop: PERCENT[15],
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              position: "absolute",
              color:
                points < 30 ? "#212529" : points < 70 ? "#212529" : "#ffffff",
              zIndex: 5,
              top: 8,
              left: "45%",
            }}
          >
            {points}%
          </Text>
          <ProgressFilledTrack
            style={{
              height: 35,
              backgroundColor:
                points < 30 ? "#dc3545" : points < 70 ? "#ffc107" : "#4BB543",
              zIndex: 4,
            }}
          />
        </Progress>

        <Button
          mt={"$40"}
          isDisabled={points < 100}
          variant="solid"
          size="lg"
          onPress={() => handleRedeem(selectedPump)}
        >
          <ButtonText>Redeem</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default LoyaltyScreen;
