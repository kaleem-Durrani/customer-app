import {
  View,
  Text,
  HStack,
  VStack,
  Image,
  Divider,
  Center,
} from "@gluestack-ui/themed";
import React, { useContext, useEffect } from "react";
import ButtonCard from "./components/ButtonCard";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import InfoNavCard from "./components/InfoNavCard";
import MiniMap from "./components/MiniMap";
import ProfileContext from "../../../Contexts/ProfileContext";
import useApi from "../../../hooks/useApi";
import customerApis from "../../../api/customer";
import useProfile from "../../../hooks/useProfile";

const Home = ({ navigation }: any) => {
  const { profile, setProfile } = useProfile();

  const getProfileApi = useApi(customerApis.getProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfileApi.request();
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (getProfileApi.data) {
      setProfile(getProfileApi.data.customer);
    }
  }, [getProfileApi.data]);

  return (
    <View flex={1} pt={"$1"} px={"$4"} bg={COLORS.primary}>
      <Text ml={"$2"} fontWeight="bold" size="3xl" color={COLORS.activeText}>
        Hello {profile ? profile.name : "Loading..."}
      </Text>
      <Text ml={"$2"} mt={-6} mb={"$1"} size="sm" color="gray">
        Good Morning
      </Text>

      {/* info and navigation card */}
      <InfoNavCard
        navigation={navigation}
        balance={profile ? profile.balance : "Loading..."}
        points={profile ? profile.points : "Loading..."}
      />

      {/* cards for map locator loyalty screen and faqs */}

      <HStack justifyContent="space-evenly" mt={"$5"}>
        <ButtonCard
          title={"  Map Locator"}
          image={require("../../../assets/images/map.png")}
          onPress={() => navigation.navigate("MapLocator")}
        />
        <ButtonCard
          title={"Loyalty Screen"}
          image={require("../../../assets/images/gift.png")}
          onPress={() => navigation.navigate("LoyaltyScreen")}
        />
        <ButtonCard
          title={"FAQs"}
          image={require("../../../assets/images/faq.png")}
          onPress={() => navigation.navigate("FAQs")}
        />
      </HStack>

      <Center
        flex={1}
        h={"$56"}
        my={"$3"}
        mx={"$2"}
        borderRadius={10}
        overflow="hidden"
      >
        <MiniMap />
      </Center>
    </View>
  );
};

export default Home;
