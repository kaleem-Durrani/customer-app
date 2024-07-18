import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Center,
  Spinner,
  HStack,
} from "@gluestack-ui/themed";
import TransactionCard from "../components/TransactionCard"; // Import your TransactionCard component
import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/Constants";
import useTransactionHistory from "../../../hooks/useTransactionHistory";

interface Transaction {
  amount: string;
  date: string;
  pumpName: string;
  paymentMethod: string;
  fuelType: string;
}

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
  const [sorting, setSorting] = useState(false);
  const {
    transactionHistory,
    fetchHistory,
    isError,
    error,
    errorStatus,
    errorProblem,
    loading,
  } = useTransactionHistory();

  useEffect(() => {
    fetchHistory();
  }, []);

  const [transactionsByMonth, setTransactionsByMonth] = useState<
    Record<string, Transaction[]>
  >({});
  const [sortedMonths, setSortedMonths] = useState<string[]>([]);

  useEffect(() => {
    if (transactionHistory) {
      setSorting(true);
      // set a time out for 5 seconds

      const transactions = transactionHistory.map((transaction) => ({
        amount: transaction.amount.toString(),
        date: new Date(transaction.createdAt).toISOString().split("T")[0],
        // Format date to 'YYYY-MM-DD'
        time: new Date(transaction.createdAt).toISOString().split("T")[1],
        pumpName: transaction.pumpId?.name || "Unknown Pump", // Handle possible missing pump name
        paymentMethod: transaction.paymentMethod,
        fuelType: transaction.fuelType,
      }));

      const transactionsByMonthData = organizeByMonth(transactions);
      const sortedMonthsData = Object.keys(transactionsByMonthData).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );

      setTransactionsByMonth(transactionsByMonthData);
      setSortedMonths(sortedMonthsData);

      setTimeout(() => {
        setSorting(false);
      }, 1000); // Adjust s value as needed
    }
  }, [transactionHistory]);

  if (loading) {
    return (
      <Center flex={1}>
        <HStack alignItems="center">
          <Spinner size="large" />
          <Text ml={"$3"} size="2xl">
            Loading...
          </Text>
        </HStack>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center flex={1}>
        <Text ml={"$3"} size="2xl">
          {errorProblem || "Unknown error"}: {errorStatus || ""}
          {"\n"}
          {error || ""}
        </Text>
      </Center>
    );
  }

  if (sorting) {
    return (
      <Center flex={1}>
        <HStack alignItems="center">
          <Spinner size="large" />
          <Text ml={"$3"} size="2xl">
            Sorting...
          </Text>
        </HStack>
      </Center>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {sortedMonths.map((month) => (
        <View key={month} style={styles.monthCard}>
          <Text style={styles.month}>{month}</Text>
          {transactionsByMonth[month].map((transaction, index) => (
            <TransactionCard
              key={index}
              amount={transaction.amount}
              date={`${transaction.date.slice(
                8
              )}, Time: ${transaction.time.slice(0, 5)}`}
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
