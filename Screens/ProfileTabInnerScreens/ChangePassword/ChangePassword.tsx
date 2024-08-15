import {
  View,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { COLORS, HEIGHT, PERCENT } from "../../../Constants/Constants";
import TopRibbon from "../../../components/TopRibbon";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import MyToast from "../../../components/MyToast";
import customerApis from "../../../api/customer";
import useApi from "../../../hooks/useApi";
import { NetworkStatusBadge } from "../../../components/NetworkBadge";

const ChangePassword = ({ navigation }: any) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const changePasswordApi = useApi(customerApis.changePassword);

  const toast = MyToast();

  const handleChangePassword = async () => {
    if (
      currentPassword.trim().length < 6 ||
      newPassword.trim().length < 6 ||
      confirmNewPassword.trim().length < 6
    ) {
      return toast.error(
        "Invalid password length",
        "Password length must be at least 6"
      );
    }
    if (newPassword !== confirmNewPassword) {
      return toast.error(
        "Passwords Mismatch",
        "Please ensure the new passwords match"
      );
    }

    await changePasswordApi.request(
      currentPassword,
      newPassword,
      confirmNewPassword
    );
  };

  useEffect(() => {
    if (changePasswordApi.error) {
      toast.error(
        `${changePasswordApi.responseProblem} ${changePasswordApi.errorStatus}`,
        `${changePasswordApi.error}`
      );
      // console.log(changePasswordApi.error);
      changePasswordApi.reset();
    }

    if (changePasswordApi.data) {
      toast.success("Success", "Password changed successfully!");
      navigation.goBack();
      // console.log(changePasswordApi.data);
      changePasswordApi.reset();
    }
  }, [changePasswordApi.data, changePasswordApi.error]);

  return (
    <View bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Change Password"} />

      <LinearGradient
        colors={[
          COLORS.tertiary,
          COLORS.primary,
          COLORS.primary,
          COLORS.tertiary,
        ]}
        start={[0.5, -0.3]}
        end={[-0.3, 0.8]}
        style={{
          elevation: 5,
          flex: 1,
          marginTop: -PERCENT[6],
          minHeight: HEIGHT,
        }}
      >
        <View p={"$3"} mx={"$6"} mt={"$10"}>
          {/* Current password */}
          <Text fontWeight="bold" color={COLORS.activeText}>
            Currnet Password
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField
              size="md"
              placeholder="Your Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </Input>

          {/* New password */}
          <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
            New Password
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField
              size="md"
              placeholder="Your New Password"
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </Input>

          {/* Confirm New password */}
          <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
            Confirm New Password
          </Text>
          <Input variant="outline" size="lg" mt={"$1"}>
            <InputField
              size="md"
              placeholder="Your Confirm New Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
          </Input>

          <Button
            isDisabled={changePasswordApi.loading}
            onPress={handleChangePassword}
            mt={"$8"}
            variant="outline"
          >
            <ButtonText>Change Password</ButtonText>
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ChangePassword;
