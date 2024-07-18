import {
  View,
  Text,
  Input,
  InputField,
  ButtonText,
  Button,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import MyToast from "../../components/MyToast";

import TopRibbon from "../../components/TopRibbon";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import customerApis from "../../api/customer";
import useApi from "../../hooks/useApi";
import useProfile from "../../hooks/useProfile";

const Transfer = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(false);

  const { profile } = useProfile();

  const toast = MyToast();

  const findReceiverApi = useApi(customerApis.findReceiver);
  const transferFundsApi = useApi(customerApis.transferFunds);

  const handleTransfer = async () => {
    // if receiver has not been selected
    if (!receiver) {
      // make sure email and phone number are not empty
      if (!phoneNumber) {
        return toast.error(
          "Invalid Inputs",
          "Please enter receiver's phone number"
        );
      }
      // make sure phone number legnth is 11
      if (phoneNumber.length !== 11) {
        return toast.error(
          "Invalid Phone Number",
          "Please enter a valid 11-digit phone number"
        );
      }

      setLoading(true);
      await findReceiverApi.request(phoneNumber);
      setLoading(false);
      return;
    }
    // if receiver is selected
    if (receiver) {
      // make sure amount is not empty
      if (!amount) {
        return toast.error("Invalid Inputs", "Please enter amount to transfer");
      }
      // make sure balance is enough
      if (Number(amount) > profile.balance) {
        return toast.error(
          "Insufficient Balance",
          "Insufficient balance to transfer"
        );
      }

      setLoading(true);
      await transferFundsApi.request(amount, "balance", receiver._id);
      setLoading(false);
    }
  };

  // for receriver success and error
  useEffect(() => {
    if (findReceiverApi.data) {
      // console.log(findReceiverApi.data);
      toast.success(
        "success",
        `Receiver found ${findReceiverApi.data.receiver.name}`
      );
      setReceiver(findReceiverApi.data.receiver);
      // console.log(receiver);
      // findReceiverApi.reset();
      return;
    }

    if (findReceiverApi.error) {
      // console.log("ruuning top up history error");
      toast.error(
        `${findReceiverApi.responseProblem} ${findReceiverApi.errorStatus}`,
        `${findReceiverApi.error}`
      );
      // findReceiverApi.reset();
    }
  }, [findReceiverApi.data, findReceiverApi.error]);

  useEffect(() => {
    if (transferFundsApi.data) {
      toast.success("Success", "Funds transferred successfully!");
      // console.log(transferFundsApi.data);
      // transferFundsApi.reset();
      return;
    }
    if (transferFundsApi.error) {
      toast.error(
        `${transferFundsApi.responseProblem} ${transferFundsApi.errorStatus}`,
        `${transferFundsApi.error}`
      );
      // transferFundsApi.reset();
    }
  }, [transferFundsApi.data, transferFundsApi.error]);

  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Transfer Funds"} />

      <View px={"$8"}>
        <Text bold size="lg" mt={"$4"}>
          {receiver
            ? "Enter balance to transfer"
            : "Find user with phone number"}
        </Text>

        <HStack mt={"$2"} alignSelf="flex-end" alignItems="center">
          <Text>Your Balance: </Text>
          <Text bold color={COLORS.activeText} size="lg">
            {profile.balance}
          </Text>
        </HStack>

        <Text fontWeight="bold" color={COLORS.activeText} mt={"$4"}>
          {receiver ? "Amount" : "Phone Number"}
        </Text>
        <Input
          // isDisabled={receiver ? true : false}
          variant="outline"
          size="lg"
          mt={"$1"}
        >
          <InputField
            inputMode="decimal"
            size="md"
            placeholder={
              receiver ? "Enter amount to transfer" : "Receiver's Phone Number"
            }
            value={receiver ? amount : phoneNumber}
            onChangeText={(e) => {
              const cleanedNumber = e.replace(/[^0-9]/g, "");
              receiver
                ? setAmount(cleanedNumber)
                : setPhoneNumber(cleanedNumber);
            }}
          />
        </Input>

        <Button
          onPress={handleTransfer}
          isDisabled={loading}
          variant="outline"
          mt={"$10"}
        >
          <ButtonText>{receiver ? "Send" : "Find User"}</ButtonText>
        </Button>

        <VStack mt={"$8"}>
          <HStack justifyContent="space-between" px={"$4"}>
            <Text size="xl" bold color={COLORS.activeText}>
              {receiver?.name}
            </Text>
            <Text size="lg">{receiver?.phoneNumber}</Text>
          </HStack>
          <Text mt={"$4"} color="gray" alignSelf="center">
            {receiver?.email}
          </Text>
        </VStack>

        <Button
          display={receiver ? "flex" : "none"}
          onPress={() => {
            setReceiver(null);
            setPhoneNumber("");
          }}
          isDisabled={loading}
          variant="outline"
          mt={"$10"}
        >
          <ButtonText>Find Another User</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default Transfer;
