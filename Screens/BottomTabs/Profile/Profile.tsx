import {
  View,
  Text,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  ScrollView,
} from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import RecordCard from "./components/RecordCard";
import NavigationCard from "./components/NavigationCard";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Profile = ({ navigation }: any) => {
  return (
    <View mt={"$0"} bg={COLORS.primary} flex={1}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary, COLORS.secondary]}
        start={[0.4, -0.4]}
        end={[1, 1]}
        style={{
          elevation: 3,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          width: "100%",
          height: "20%",
        }}
      >
        <Text alignSelf="center" size="4xl" fontWeight="bold" mt={"$4"}>
          Profile
        </Text>
        <Entypo
          name="log-out"
          size={PERCENT[10]}
          color={COLORS.tertiary}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            borderWidth: 3,
            borderColor: COLORS.tertiary,
            borderRadius: PERCENT[100],
            paddingLeft: PERCENT[3],
            paddingTop: PERCENT[2],
            alignSelf: "center",
          }}
        />
      </LinearGradient>
      <Avatar size="2xl" alignSelf="center" mt={"-15%"} elevation={6}>
        <AvatarFallbackText>SS</AvatarFallbackText>
        <AvatarImage
          alt="your profile pic"
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
        />
      </Avatar>
      <Text fontWeight="bold" alignSelf="center">
        User-Name
      </Text>
      <Text color="gray" size="2xs" alignSelf="center">
        user1234@gmail.com
      </Text>

      <ScrollView mx={"$3"} showsVerticalScrollIndicator={false}>
        <HStack justifyContent="space-evenly" py={"$2"}>
          <RecordCard
            image={require("../../../assets/images/oil.png")}
            title={"Fuel Bought"}
            amount={500}
          />
          <RecordCard
            image={require("../../../assets/images/money.png")}
            title={"Total Points"}
            amount={500}
          />
          <RecordCard
            image={require("../../../assets/images/points.png")}
            title={"Money Saved"}
            amount={500}
          />
        </HStack>
        <View p={"$2"}>
          <NavigationCard
            name={"user"}
            title={"Personal Details"}
            onPress={() => navigation.navigate("PersonalDetails")}
          />
          <NavigationCard
            name={"lock"}
            title={"Change Password"}
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <NavigationCard
            name={"bell"}
            title={"Notifications"}
            onPress={() => navigation.navigate("Notifications")}
          />
          <NavigationCard
            name={"chat"}
            title={"Customer Support"}
            onPress={() => navigation.navigate("CustomerSupport")}
          />
          <NavigationCard
            name={"documents"}
            title={"Privacy Policy"}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <NavigationCard
            name={"log-out"}
            title={"Logout"}
            onPress={() => console.log("Log out clicked")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
