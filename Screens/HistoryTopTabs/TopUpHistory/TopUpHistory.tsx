import {
  View,
  Text,
  Spinner,
  Center,
  HStack,
  ScrollView,
} from "@gluestack-ui/themed";
import React, { useEffect, useState, useMemo } from "react";
import useTopUpHistory from "../../../hooks/useTopUpHistory";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/Constants";
import { NetworkStatusBadge } from "../../../components/NetworkBadge";

const TopUpHistory = () => {
  const {
    topUpHistory,
    fetchTopUpHistory,
    isError,
    error,
    errorProblem,
    errorStatus,
    loading,
  } = useTopUpHistory();

  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    if (!topUpHistory) {
      fetchTopUpHistory();
    }
  }, []);

  const transactionsByMonth = useMemo(() => {
    if (!topUpHistory) return {};

    setSorting(true);
    const organized = topUpHistory.reduce((acc, transaction) => {
      const month = new Date(transaction.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(transaction);
      return acc;
    }, {});
    setSorting(false);
    return organized;
  }, [topUpHistory]);

  const sortedMonths = Object.keys(transactionsByMonth).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  if (loading) {
    return (
      <Center flex={1}>
        <NetworkStatusBadge />
        <HStack alignItems="center">
          <Spinner size="large" />
          <Text ml={"$3"} size="2xl">
            Loading...
          </Text>
        </HStack>
      </Center>
    );
  }

  if (sorting) {
    return (
      <Center flex={1}>
        <NetworkStatusBadge />
        <HStack alignItems="center">
          <Spinner size="large" />
          <Text ml={"$3"} size="2xl">
            Sorting...
          </Text>
        </HStack>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center flex={1}>
        <NetworkStatusBadge />
        <Text ml={"$3"} size="2xl">
          {errorProblem || "Unknown error"}: {errorStatus || ""}
          {"\n"}
          {error || ""}
        </Text>
      </Center>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NetworkStatusBadge />
      {sortedMonths.map((month) => (
        <View key={month} style={styles.monthCard}>
          <Text style={styles.month}>{month}</Text>
          {transactionsByMonth[month].map((transaction) => (
            <View key={transaction._id} style={styles.transactionCard}>
              <Text style={styles.amount}>Amount: ${transaction.amount}</Text>
              <Text style={styles.topUpThrough}>
                Method: {transaction.topUpThrough}
              </Text>
              <Text style={styles.date}>
                Date: {new Date(transaction.createdAt).toLocaleDateString()},
                Time: {new Date(transaction.createdAt).toLocaleTimeString()}
              </Text>
            </View>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.activeText,
  },
  transactionCard: {
    backgroundColor: COLORS.primary,
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
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  topUpThrough: {
    fontSize: 16,
    marginVertical: 2,
  },
  date: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default TopUpHistory;
