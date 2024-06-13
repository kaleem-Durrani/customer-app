import React from "react";
import { View, Text, ScrollView } from "@gluestack-ui/themed";
import TransactionCard from "../components/TransactionCard"; // Import your TransactionCard component
import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/Constants";

interface Transaction {
  amount: string;
  date: string;
  pumpName: string;
  paymentMethod: string;
  fuelType: string;
}

const randomTransaction = (): Transaction => {
  const paymentMethods = ["cash", "app", "points", "app+points"];
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric"];
  const pumpNames = ["Pump A", "Pump B", "Pump C", "Pump D"];

  const getRandomItem = (array: string[]) =>
    array[Math.floor(Math.random() * array.length)];

  return {
    amount: (Math.random() * 100).toFixed(2),
    date: new Date(
      2023,
      Math.floor(Math.random() * 6),
      Math.ceil(Math.random() * 28)
    )
      .toISOString()
      .split("T")[0],
    pumpName: getRandomItem(pumpNames),
    paymentMethod: getRandomItem(paymentMethods),
    fuelType: getRandomItem(fuelTypes),
  };
};

const generateTransactions = (num: number): Transaction[] =>
  Array.from({ length: num }, randomTransaction);

const organizeByMonth = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
};

const TransactionHistory = () => {
  const transactions = generateTransactions(20);
  const transactionsByMonth = organizeByMonth(transactions);
  const sortedMonths = Object.keys(transactionsByMonth).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {sortedMonths.map((month) => (
        <View key={month} style={styles.monthCard}>
          <Text style={styles.month}>{month}</Text>
          {transactionsByMonth[month].map((transaction, index) => (
            <TransactionCard
              key={index}
              amount={transaction.amount}
              date={transaction.date}
              pumpName={transaction.pumpName}
              paymentMethod={transaction.paymentMethod}
              fuelType={transaction.fuelType}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "2%",
  },
  monthCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: "3%",
    elevation: 5, // For Android
    shadowColor: "#000", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.2, // For iOS
    shadowRadius: 2, // For iOS
  },
  month: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: COLORS.activeText,
  },
});

export default TransactionHistory;
