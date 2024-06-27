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
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Signup({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);

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
        pt={"$4"}
        px={"$10"}
        borderTopLeftRadius={PERCENT[8]}
        borderTopRightRadius={PERCENT[8]}
      >
        <Text fontWeight="bold" size="2xl" alignSelf="center">
          Sign Up for Free
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* email */}
          <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
            Email
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField size="md" placeholder="Your Email Address" />
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
            mt={"$8"}
            borderRadius={PERCENT[3]}
            onPress={() => {
              console.log("Sign up button clicked");
              // alert("yoo");
            }}
          >
            <ButtonText>Sign Up</ButtonText>
          </Button>

          <Text alignSelf="center" mt={"$6"}>
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
