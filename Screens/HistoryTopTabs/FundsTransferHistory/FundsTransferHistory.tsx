import { View, Text, ScrollView } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import useHistory from "../../../hooks/useHistory";
import useProfile from "../../../hooks/useProfile";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/Constants";

const FundsTransferHistory = () => {
  const { fundsTransferHistory } = useHistory();
  const { profile } = useProfile();

  useEffect(() => {
    if (fundsTransferHistory) {
      // console.log(fundsTransferHistory);
    }
  }, [fundsTransferHistory]);

  const organizeByMonth = (transactions) => {
    return transactions.reduce((acc, transaction) => {
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
  };

  const transactionsByMonth = organizeByMonth(fundsTransferHistory || []);
  const sortedMonths = Object.keys(transactionsByMonth).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const TransferCard = ({ transaction }) => {
    const isSent = profile._id === transaction.senderId._id;
    const user = isSent ? transaction.receiverId : transaction.senderId;

    return (
      <View style={styles.transferCard}>
        <Text style={isSent ? styles.sentTag : styles.receivedTag}>
          {isSent ? "Sent" : "Received"}
        </Text>
        <Text style={styles.amount}>Amount: ${transaction.amount}</Text>
        <Text style={styles.name}>Name: {user.name}</Text>
        <Text style={styles.email}>Email: {user.email}</Text>
        <Text style={styles.phone}>Phone: {user.phoneNumber}</Text>
        <Text style={styles.date}>
          Date: {new Date(transaction.createdAt).toLocaleDateString()}, Time:{" "}
          {new Date(transaction.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {sortedMonths.map((month) => (
        <View key={month} style={styles.monthCard}>
          <Text style={styles.month}>{month}</Text>
          {transactionsByMonth[month].map((transaction, index) => (
            <TransferCard key={index} transaction={transaction} />
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
  transferCard: {
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
  sentTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  receivedTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  name: {
    fontSize: 16,
    marginVertical: 2,
  },
  email: {
    fontSize: 16,
    marginVertical: 2,
  },
  phone: {
    fontSize: 16,
    marginVertical: 2,
  },
  date: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default FundsTransferHistory;
