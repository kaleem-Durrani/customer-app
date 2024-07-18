import React from "react";
import { View, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/Constants";

interface TransactionCardProps {
  amount: string;
  date: string;
  pumpName: string;
  paymentMethod: string;
  fuelType: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  amount,
  date,
  pumpName,
  paymentMethod,
  fuelType,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>Date: {date}</Text>

      <HStack justifyContent="space-between">
        <VStack>
          <HStack>
            <Text color="gray" size="sm">
              Amount: Rs{" "}
            </Text>
            <Text color={COLORS.activeText}>{amount}</Text>
          </HStack>
          <Divider my={"$1"} />

          <Text color="gray" size="sm">
            Fuel Type: {fuelType}
          </Text>
        </VStack>

        {/* <Divider></Divider> */}

        <VStack>
          <Text alignSelf="flex-end">{pumpName}</Text>
          <Divider my={"$1"} />
          <HStack>
            <Text color="gray" size="sm" alignSelf="flex-end">
              Payment:
            </Text>
            <Text color={COLORS.activeText}> {paymentMethod}</Text>
          </HStack>
        </VStack>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 3,
    elevation: 5, // For Android
    shadowColor: "#000", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.2, // For iOS
    shadowRadius: 2, // For iOS
  },
  date: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  //   amount: {
  //     marginBottom: 4,
  //   },
  //   pumpName: {
  //     marginBottom: 4,
  //   },
  //   paymentMethod: {
  //     marginBottom: 4,
  //   },
  //   fuelType: {
  //     marginBottom: 4,
  //   },
});

export default TransactionCard;
