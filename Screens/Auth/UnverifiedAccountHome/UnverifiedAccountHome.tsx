import {
  Button,
  ButtonText,
  HStack,
  View,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { COLORS, HEIGHT, PERCENT } from "../../../Constants/Constants";
import useAuth from "../../../auth/useAuth";
import { FontAwesome } from "@expo/vector-icons";

const UnverifiedAccountHome = ({ navigation }: any) => {
  const auth = useAuth();

  const confirmLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => {
          handleLogOut();
        },
      },
    ]);
  };

  const handleLogOut = () => {
    auth.logOut();
  };

  return (
    <View bg={COLORS.primary} flex={1} p={"$6"}>
      <View position="absolute" top={0} right={0} p={"$4"}>
        <TouchableOpacity style={{ zIndex: 1 }} onPress={() => confirmLogOut()}>
          <FontAwesome
            name="sign-out"
            size={PERCENT[12]}
            color={COLORS.tertiary}
          />
          <Text size="2xs">Logout</Text>
        </TouchableOpacity>
      </View>

      <Text color={COLORS.tertiary} bold size="2xl">
        Welcome Dear User
      </Text>

      <VStack alignItems="center">
        <Text size="xl" mt={"$12"}>
          Your Account Status:{" "}
        </Text>
        <Text mt={"$2"} bold size="2xl" color="red">
          Unverified{" "}
        </Text>
      </VStack>

      <VStack mt={"$20"} alignItems="center">
        <Text size="lg">To continue using the App</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("VerifyAccount");
          }}
        >
          <Text mt={"$2"} size="xl" bold color={COLORS.tertiary}>
            {" "}
            Verify Account
          </Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default UnverifiedAccountHome;
