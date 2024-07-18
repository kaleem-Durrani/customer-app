import { useContext } from "react";
import HistoryContext from "../Contexts/HistoryContext";

export default useAuth = () => {
  const {
    transactionHistory,
    setTransactionHistory,
    topUpHistory,
    setTopUpHistory,
    fundsTransferHistory,
    setFundsTransferHistory,
  } = useContext(HistoryContext);

  return {
    transactionHistory,
    setTransactionHistory,
    topUpHistory,
    setTopUpHistory,
    fundsTransferHistory,
    setFundsTransferHistory,
  };
};
