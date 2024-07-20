import {
  View,
  Text,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  Button,
  ButtonText,
  HStack,
  Divider,
  ScrollView,
  Image,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import MyToast from "../../../components/MyToast";

import authApi from "../../../api/auth";

export default function Signup({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = MyToast();

  const handleSignup = async () => {
    // TODO: Implement signup logic here
    // console.log("Signup", {
    //   name,
    //   email,
    //   phoneNumber,
    //   password,
    //   confirmPassword,
    // });

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      phoneNumber.trim() === ""
    ) {
      toast.error("All fields are required", "Please fill in all fields");
      return;
    }
    // verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      return toast.error("Invalid email", "Please enter a valid email");
    }
    // verify password length is at least 6
    if (password.length < 6) {
      return toast.error(
        "Invalid Password Length",
        "Please enter a password of at least 6 characters"
      );
    }
    // verifty phone number legnth is 11
    if (phoneNumber.length !== 11) {
      return toast.error(
        "Invalid Phone Number",
        "Please enter a valid 11-digit phone number"
      );
    }
    // verify password and confirm password match
    if (password !== confirmPassword) {
      return toast.error(
        "Passwords Mismatch",
        "Please ensure the passwords match"
      );
    }

    setLoading(true);
    const result = await authApi.signup(
      name,
      email,
      password,
      confirmPassword,
      phoneNumber
    );
    setLoading(false);

    if (!result.ok) {
      return toast.error(
        `${result.problem} ${result.status}`,
        `${result.data.error}`
      );
    }
    console.log(result);
    toast.success(
      `Sign up successful ${result.status}`,
      `${result.data.message}`
    );
    Alert.alert(
      "Account Created Successfully",
      "An OTP has been sent to your email.\nPlease log in and verify your Account to start using the app.",
      [
        {
          text: "Log in",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]
    );
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
          source={require("../../../assets/images//auth/signup.png")}
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
        zIndex={5}
        // mx={"$3"}
        pt={"$4"}
        px={"$10"}
        borderTopLeftRadius={PERCENT[8]}
        borderTopRightRadius={PERCENT[8]}
      >
        <Text fontWeight="bold" size="2xl" alignSelf="center">
          Sign Up for Free
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* name */}
          <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
            Name
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField
              size="md"
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
          </Input>

          {/* email */}
          <Text fontWeight="bold" color={COLORS.activeText} mt={"$3"}>
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

          {/* phone Number */}
          <Text fontWeight="bold" color={COLORS.activeText} mt={"$3"}>
            Phone Number
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField
              inputMode="decimal"
              size="md"
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChangeText={(e) => {
                // make sure only digits are allowed
                const cleanedPhoneNumber = e.replace(/[^0-9]/g, "");
                setPhoneNumber(cleanedPhoneNumber);
              }}
            />
          </Input>

          {/* password  */}
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

          {/* confirm password */}

          <Text fontWeight="bold" color={COLORS.activeText} mt={"$3"}>
            Confirm Password
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField
              size="md"
              placeholder="Your Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          {/* sign up button */}
          <Button
            isDisabled={loading}
            mt={"$6"}
            borderRadius={PERCENT[3]}
            onPress={handleSignup}
          >
            <ButtonText>Sign Up</ButtonText>
          </Button>

          <Text alignSelf="center" mt={"$4"}>
            or Sign in with
          </Text>

          {/* google and facebook buttons */}
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

          <HStack alignSelf="center" alignItems="flex-end" mt={"$10"} mb={"$6"}>
            <Text>Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text color={COLORS.activeText}>Sign in</Text>
            </TouchableOpacity>
          </HStack>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
