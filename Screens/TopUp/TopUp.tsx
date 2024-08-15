import {
  View,
  Text,
  Input,
  InputField,
  ButtonText,
  Button,
  HStack,
} from "@gluestack-ui/themed";
import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../Constants/Constants";
import TopRibbon from "../../components/TopRibbon";
import MyToast from "../../components/MyToast";
import customerApis from "../../api/customer";
import useApi from "../../hooks/useApi";
import useProfile from "../../hooks/useProfile";
import { NetworkStatusBadge } from "../../components/NetworkBadge";
const TopUp = ({ navigation }: any) => {
  const [topUpThrough, setTopUpThrough] = useState("");
  const [amount, setAmount] = useState("");
  const [showingToast, setShowingToast] = useState(false);
  const toast = MyToast();
  const toastTimeoutRef = useRef(null);

  const { refreshProfile } = useProfile();

  const topUpApi = useApi(customerApis.topUpAccount);

  const handleTopUpAccount = async () => {
    if (!topUpThrough || !amount) {
      if (!showingToast) {
        setShowingToast(true);
        toast.error(
          "All Fields Required",
          "Please provide a valid amount and a top up method"
        );

        toastTimeoutRef.current = setTimeout(() => {
          setShowingToast(false);
        }, 3000);
      }
      return;
    }

    await topUpApi.request(topUpThrough, amount);

    // Add your top-up logic here
  };

  // useEffect to handle the toast for top up api response
  useEffect(() => {
    if (topUpApi.data) {
      toast.success("Success", `${topUpApi.data.message}`);
      refreshProfile();
      setAmount("");
      setTopUpThrough("");
      // navigation.goBack();
    }
    if (topUpApi.error) {
      toast.error(
        `${topUpApi.responseProblem} ${topUpApi.errorStatus}`,
        `${topUpApi.error}`
      );
    }
  }, [topUpApi.data, topUpApi.error]);

  useEffect(() => {
    return () => {
      // Clear the timeout if the component unmounts
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <View bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Top Up"} />

      <View px={"$8"} pt={"$4"}>
        <HStack>
          <Text size="xl">Top up through : </Text>
          <Text size="xl" bold color={COLORS.activeText}>
            {topUpThrough}
          </Text>
        </HStack>

        <HStack mt={"$8"} justifyContent="space-between">
          <Button
            variant="outline"
            onPress={() => setTopUpThrough("Easy Paisa")}
          >
            <ButtonText>Easy paisa</ButtonText>
          </Button>
          <Button
            variant="outline"
            onPress={() => setTopUpThrough("Jazz Cash")}
          >
            <ButtonText>Jazz Cash</ButtonText>
          </Button>
          <Button variant="outline" onPress={() => setTopUpThrough("Bank")}>
            <ButtonText>Bank</ButtonText>
          </Button>
        </HStack>

        <Text color={COLORS.activeText} size="lg" mt={"$8"}>
          Amount
        </Text>
        <Input variant="outline" size="lg" mt={"$1"}>
          <InputField
            inputMode="decimal"
            size="md"
            placeholder="Enter dummy Top Up Amount"
            value={amount}
            onChangeText={(e) => {
              if (amount.length === 0 && e === "0") return;
              const cleanedNumber = e.replace(/[^0-9]/g, "");
              setAmount(cleanedNumber);
            }}
          />
        </Input>

        <Button
          isDisabled={topUpApi.loading}
          mt={"$10"}
          onPress={handleTopUpAccount}
          variant="solid"
        >
          <ButtonText>Top Up Account</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default TopUp;
