import { useContext } from "react";
import ProfileContext from "../Contexts/ProfileContext";

export default useAuth = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  return { profile, setProfile };
};
