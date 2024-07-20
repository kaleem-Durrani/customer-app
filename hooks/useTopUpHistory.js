import { useEffect, useState } from "react";
import useApi from "./useApi";
import customerApis from "../api/customer";
import MyToast from "../components/MyToast";

export default useTransactionHistory = () => {
  const [topUpHistory, setTopUpHistory] = useState(null);

  const toast = MyToast();

  const topUpHistoryApi = useApi(customerApis.getTopUpHistory);

  const fetchTopUpHistory = async () => {
    setTopUpHistory(null);
    await topUpHistoryApi.request();
  };

  useEffect(() => {
    if (topUpHistoryApi.error) {
      toast.error(
        `${topUpHistoryApi.responseProblem} ${topUpHistoryApi.errorStatus}`,
        `${topUpHistoryApi.error}`
      );
      return;
    }
    if (topUpHistoryApi.data) {
      toast.success("Loaded successfully", `${topUpHistoryApi.data.message}`);

      setTopUpHistory(topUpHistoryApi.data.topUpHistory);
      return;
    }
  }, [topUpHistoryApi.error, topUpHistoryApi.data]);

  const refreshTopUpHistory = async () => {
    await fetchTopUpHistory();
  };

  return {
    loading: topUpHistoryApi.loading,
    error: topUpHistoryApi.error,
    isError: topUpHistoryApi.isError,
    errorStatus: topUpHistoryApi.errorStatus,
    errorProblem: topUpHistoryApi.responseProblem,
    topUpHistory,
    fetchTopUpHistory,
    refreshTopUpHistory,
  };
};
