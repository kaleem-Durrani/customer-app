import {
  View,
  Text,
  Input,
  InputField,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import TopRibbon from "../../../components/TopRibbon";
import { LinearGradient } from "expo-linear-gradient";

const ChangePassword = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Change Password"} />

      <KeyboardAvoidingView flex={1}>
        <LinearGradient
          colors={[COLORS.tertiary, COLORS.primary, COLORS.tertiary]}
          start={[1, -0.4]}
          end={[0.7, 1]}
          style={{
            elevation: 5,
            flex: 1,
            marginTop: -PERCENT[6],
          }}
        >
          <View p={"$3"} mx={"$6"} mt={"$10"}>
            {/* Current password */}
            <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
              Currnet Password
            </Text>
            <Input variant="outline" size="lg" mt={"$1"}>
              <InputField size="md" placeholder="Your Current Password" />
            </Input>

            {/* New password */}
            <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
              New Password
            </Text>
            <Input variant="outline" size="lg" mt={"$1"}>
              <InputField size="md" placeholder="Your New Password" />
            </Input>

            {/* Confirm New password */}
            <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
              Confirm New Password
            </Text>
            <Input variant="outline" size="lg" mt={"$1"}>
              <InputField size="md" placeholder="Your Confirm New Password" />
            </Input>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePassword;
