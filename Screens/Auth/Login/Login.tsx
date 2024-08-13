import { decode } from "base-64";
global.atob = decode;

import {
  View,
  Text,
  Input,
  InputSlot,
  InputField,
  Button,
  ButtonText,
  HStack,
  Image,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import MyToast from "../../../components/MyToast";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import authApi from "../../../api/auth";
import useAuth from "../../../auth/useAuth";

export default function Login({ navigation }: any) {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const toast = MyToast();

  const handleLogin = async () => {
    // verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      return toast.error("Invalid email", "Please enter a valid email");
    }

    // make sure password length is at least 6
    if (password.length < 6) {
      return toast.error(
        "Invalid Password Length",
        "Please enter a password of at least 6 characters"
      );
    }

    setLoading(true);
    const result = await authApi.login(email, password);
    setLoading(false);

    if (!result.ok) {
      console.log("error");
      return toast.error(
        `${result.problem} ${result.status}`,
        `${result.data.error}`
      );
    }
    auth.login(result.data.token);
  };

  return (
    <View flex={1}>
      <LinearGradient
        colors={[COLORS.tertiary, COLORS.secondary]}
        start={[0.1, 0.7]}
        end={[1, -0.3]}
        style={{
          position: "relative",
          top: 0,
          height: "40%",
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/images//auth/login.png")}
          alt="login"
          size="2xl"
          mb={"$12"}
        />
      </LinearGradient>

      <View
        flex={1}
        elevation={5}
        bg={COLORS.secondary}
        mt={"-$8"}
        pt={"$4"}
        px={"$10"}
        borderTopLeftRadius={PERCENT[8]}
        borderTopRightRadius={PERCENT[8]}
      >
        <Text fontWeight="bold" size="2xl" alignSelf="center">
          Sign in to Your Account
        </Text>

        <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
          Email
        </Text>
        <Input variant="outline" size="lg" mt={"$1"}>
          <InputField
            size="md"
            placeholder="Your Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </Input>

        <Text fontWeight="bold" color={COLORS.activeText} mt={"$3"}>
          Password
        </Text>
        <Input variant="outline" size="lg" mt={"$1"}>
          <InputField
            size="md"
            placeholder="Your Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChangeText={setPassword}
          />
          <InputSlot mr={"$3"} bg={COLORS.secondary}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={showPassword ? COLORS.tertiary : "gray"}
              />
            </TouchableOpacity>
          </InputSlot>
        </Input>

        <View mt={"$3"}>
          <TouchableOpacity onPress={() => navigation.navigate("OTPScreen")}>
            <Text alignSelf="flex-end" color={COLORS.activeText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          mt={"$3"}
          borderRadius={PERCENT[3]}
          onPress={() => handleLogin()}
          // disabled={loading}
          isDisabled={loading}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>

        <Text alignSelf="center" mt={"$3"}>
          or Sign in with
        </Text>

        <HStack mt={"$3"} alignSelf="center" gap={PERCENT[10]}>
          <TouchableOpacity
            style={{
              overflow: "hidden",
              elevation: 1,
              backgroundColor: COLORS.primary,
              borderRadius: PERCENT[3],
            }}
          >
            <View py={"$2"} px={"$3"}>
              <FontAwesome name="google" size={PERCENT[12]} color="#ea580c" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              overflow: "hidden",
              elevation: 1,
              backgroundColor: COLORS.primary,
              borderRadius: PERCENT[3],
            }}
          >
            <View py={"$2"} px={"$3"}>
              <FontAwesome
                name="facebook-square"
                size={PERCENT[12]}
                color="blue"
              />
            </View>
          </TouchableOpacity>
        </HStack>

        <HStack alignSelf="center" flex={1} alignItems="flex-end" mb={"$4"}>
          <Text>Dont have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text color={COLORS.activeText}>Sign up</Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
