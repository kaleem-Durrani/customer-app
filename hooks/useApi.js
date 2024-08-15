import { useState, useEffect } from "react";
// import NetInfo from "@react-native-community/netinfo";
// import MyToast from "../components/MyToast";

export default useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErronStatus] = useState(null);
  const [responseProblem, setResponseProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [isConnected, setIsConnected] = useState(true);

  // const toast = MyToast();

  // useEffect(() => {
  //   // Subscribe to network state updates
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //   });

  //   // Unsubscribe when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  const request = async (...args) => {
    setData(null);
    setIsError(false);
    setError(null);
    // if (!isConnected) {
    //   toast.error(
    //     "No Internet Connection",
    //     "Please check your internet connection and try again."
    //   );
    //   return;
    // }

    setLoading(true);
    const response = await apiFunc(...args);
    // console.log(response);
    setLoading(false);

    if (!response.ok) {
      // console.log("errorrrrr");
      setIsError(true);
      setErronStatus(response.status);
      setResponseProblem(response.problem);
      // console.log(response.problem);
      setError(response.data.error);
      setData(null);
      return;
    }

    setIsError(false);
    setError(null);
    setData(response.data);
    // console.log(response.data.message);
    // console.log(response);
  };

  const reset = () => {
    setData(null);
    setIsError(false);
    setError(null);
    setErronStatus(null);
    setResponseProblem(null);
    setLoading(false);
  };

  return {
    isError,
    data,
    error,
    errorStatus,
    responseProblem,
    loading,
    request,
    reset,
  };
};
