import { useEffect, useState } from "react";
import useApi from "./useApi";
import customerApis from "../api/customer";
import MyToast from "../components/MyToast";

export default useTransactionHistory = () => {
  const [fundsTransferHistory, setFundsTransferHistory] = useState(null);

  const toast = MyToast();

  const fundsTransferApi = useApi(customerApis.getFundsTransferHistory);

  const fetchFundsTransferHistory = async () => {
    setFundsTransferHistory(null);
    await fundsTransferApi.request();
  };

  useEffect(() => {
    if (fundsTransferApi.error) {
      toast.error(
        `${fundsTransferApi.responseProblem} ${fundsTransferApi.errorStatus}`,
        `${fundsTransferApi.error}`
      );
      return;
    }
    if (fundsTransferApi.data) {
      toast.success("Loaded successfully", `${fundsTransferApi.data.message}`);

      setFundsTransferHistory(fundsTransferApi.data.fundsTransferHistory);
    }
  }, [fundsTransferApi.error, fundsTransferApi.data]);

  const refreshFundsTransferHistory = async () => {
    await fetchFundsTransferHistory();
  };

  return {
    loading: fundsTransferApi.loading,
    error: fundsTransferApi.error,
    isError: fundsTransferApi.isError,
    errorStatus: fundsTransferApi.errorStatus,
    errorProblem: fundsTransferApi.responseProblem,
    fundsTransferHistory,
    fetchFundsTransferHistory,
    refreshFundsTransferHistory,
  };
};
