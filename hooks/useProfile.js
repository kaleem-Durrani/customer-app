import { useContext, useEffect } from "react";
import ProfileContext from "../Contexts/ProfileContext";
import customerApis from "../api/customer";
import useApi from "./useApi";

// transfer the get profile api call with the name get profile

export default useProfile = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  const getProfileApi = useApi(customerApis.getProfile);

  const fetchProfile = async () => {
    setProfile(null);
    await getProfileApi.request();
  };

  useEffect(() => {
    if (getProfileApi.data) {
      setProfile(getProfileApi.data.customer);
    }
  }, [getProfileApi.data]);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return { profile, setProfile, fetchProfile, refreshProfile };
};
