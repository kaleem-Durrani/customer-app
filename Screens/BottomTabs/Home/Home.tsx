import { View, Text, HStack, Button, Spinner } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import ButtonCard from "./components/ButtonCard";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import InfoNavCard from "./components/InfoNavCard";
import useProfile from "../../../hooks/useProfile";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import customerApis from "../../../api/customer";
import useApi from "../../../hooks/useApi";

////////////////////////////////////////////////

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

///////////////////////////////////////////////

const Home = ({ navigation }: any) => {
  const { profile, fetchProfile, refreshProfile } = useProfile();

  /////////////////////////////////////////
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));
    console.log(expoPushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // //////////////////////////////////////////

  const updatePushTokenApi = useApi(customerApis.updatePushToken);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const updatePushToken = async () => {
      await updatePushTokenApi.request(expoPushToken);
    };
    if (expoPushToken) {
      updatePushToken();
    }
  }, [expoPushToken]);

  return (
    <View flex={1} pt={"$1"} px={"$4"} bg={COLORS.primary}>
      <Button
        variant="outline"
        position="absolute"
        right={20}
        top={10}
        zIndex={10}
        onPress={() => refreshProfile()}
      >
        {profile ? (
          <FontAwesome
            name="refresh"
            size={PERCENT[6]}
            color={COLORS.tertiary}
          />
        ) : (
          <Spinner size="small" />
        )}
      </Button>
      <Text ml={"$2"} fontWeight="bold" size="3xl" color={COLORS.activeText}>
        {profile ? "Hello " + profile.name : "Loading..."}
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
    </View>
  );
};

export default Home;
