import { View, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import HistoryTopTabNavigator from "./HistoryTopTabNavigator";
import TopRibbon from "../../components/TopRibbon";
import HistoryContext from "../../Contexts/HistoryContext";
import customerApis from "../../api/customer";
import useApi from "../../hooks/useApi";
import MyToast from "../../components/MyToast";

const HistoryContainer = ({ navigation }: any) => {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [topUpHistory, setTopUpHistory] = useState(null);
  const [fundsTransferHistory, setFundsTransferHistory] = useState(null);

  const toast = MyToast();

  const transactionHistoryApi = useApi(customerApis.getTransactionHistory);

  const topUpHistoryApi = useApi(customerApis.getTopUpHistory);

  const fundsTransferHistoryApi = useApi(customerApis.getFundsTransferHistory);

  const fetchTransactionHistory = async () => {
    await transactionHistoryApi.request();
  };

  const fetchTopUpHistory = async () => {
    await topUpHistoryApi.request();
  };

  const fetchFundsTransferHistory = async () => {
    await fundsTransferHistoryApi.request();
  };

  useEffect(() => {
    const fetchHistory = async () => {
      await Promise.all([
        fetchTransactionHistory(),
        fetchTopUpHistory(),
        fetchFundsTransferHistory(),
      ]);
    };

    fetchHistory();
  }, []);

  // transaction history request succes and failure handler
  useEffect(() => {
    if (transactionHistoryApi.data) {
      toast.success(
        "Loaded successfully",
        `${transactionHistoryApi.data.message}`
      );
      setTransactionHistory(transactionHistoryApi.data.transactions);
      transactionHistoryApi.reset();
      return;
    }
    if (transactionHistoryApi.error) {
      toast.error(
        `${transactionHistoryApi.responseProblem} ${transactionHistoryApi.errorStatus}`,
        `${transactionHistoryApi.error}`
      );
      transactionHistoryApi.reset();
    }
  }, [transactionHistoryApi.data, transactionHistoryApi.error]);

  // top up history request success and failure handler
  useEffect(() => {
    // console.log("ruuning top up use effect");
    if (topUpHistoryApi.data) {
      toast.success("Loaded successfully", `${topUpHistoryApi.data.message}`);
      setTopUpHistory(topUpHistoryApi.data.topUpHistory);
      topUpHistoryApi.reset();
      return;
    }
    if (topUpHistoryApi.error) {
      // console.log("ruuning top up history error");
      toast.error(
        `${topUpHistoryApi.responseProblem} ${topUpHistoryApi.errorStatus}`,
        `${topUpHistoryApi.error}`
      );
      topUpHistoryApi.reset();
    }
  }, [topUpHistoryApi.data, topUpHistoryApi.error]);

  // funds transfer history request success and failure handler
  useEffect(() => {
    if (fundsTransferHistoryApi.data) {
      toast.success(
        "Loaded successfully",
        `${fundsTransferHistoryApi.data.message}`
      );
      setFundsTransferHistory(
        fundsTransferHistoryApi.data.fundsTransferHistory
      );
      // console.log(fundsTransferHistoryApi.data.fundsTransferHistory);
      fundsTransferHistoryApi.reset();
      return;
    }
    if (fundsTransferHistoryApi.error) {
      toast.error(
        `${fundsTransferHistoryApi.responseProblem} ${fundsTransferHistoryApi.errorStatus}`,
        `${fundsTransferHistoryApi.error}`
      );
      fundsTransferHistoryApi.reset();
    }
  }, [fundsTransferHistoryApi.data, fundsTransferHistoryApi.error]);

  return (
    <HistoryContext.Provider
      value={{
        transactionHistory,
        setTransactionHistory,
        topUpHistory,
        setTopUpHistory,
        fundsTransferHistory,
        setFundsTransferHistory,
      }}
    >
      <View flex={1}>
        <TopRibbon navigation={navigation} title={"History"} />
        <View my={"$1"}></View>
        <HistoryTopTabNavigator />
      </View>
    </HistoryContext.Provider>
  );
};

export default HistoryContainer;
