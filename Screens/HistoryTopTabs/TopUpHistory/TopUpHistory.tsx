import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import useHistory from "../../../hooks/useHistory";

const TopUpHistory = () => {
  const { fundsTransferHistory, transactionHistory } = useHistory();
  return (
    <View>
      <Text>Top up history</Text>
      <Text></Text>
      {/* <Text>{JSON.stringify(transactionHistory)}</Text> */}
    </View>
  );
};

export default TopUpHistory;
