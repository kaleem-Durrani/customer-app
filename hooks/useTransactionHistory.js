import { useEffect, useState } from "react";
import useApi from "./useApi";
import customerApis from "../api/customer";
import MyToast from "../components/MyToast";

export default useTransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState(null);

  const toast = MyToast();

  const transactionHistoryApi = useApi(customerApis.getTransactionHistory);

  const fetchHistory = async () => {
    setTransactionHistory(null);
    await transactionHistoryApi.request();
  };

  useEffect(() => {
    if (transactionHistoryApi.error) {
      toast.error(
        `${transactionHistoryApi.responseProblem} ${transactionHistoryApi.errorStatus}`,
        `${transactionHistoryApi.error}`
      );
      return;
    }
    if (transactionHistoryApi.data) {
      toast.success(
        "Loaded successfully",
        `${transactionHistoryApi.data.message}`
      );

      setTransactionHistory(transactionHistoryApi.data.transactions);
    }
  }, [transactionHistoryApi.error, transactionHistoryApi.data]);

  const refreshHistory = async () => {
    await fetchHistory();
  };

  return {
    loading: transactionHistoryApi.loading,
    error: transactionHistoryApi.error,
    isError: transactionHistoryApi.isError,
    errorStatus: transactionHistoryApi.errorStatus,
    errorProblem: transactionHistoryApi.responseProblem,
    transactionHistory,
    fetchHistory,
    refreshHistory,
  };
};
