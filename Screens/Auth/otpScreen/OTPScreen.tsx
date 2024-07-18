import { Button, ButtonText } from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { HEIGHT } from "../../../Constants/Constants";
import useAuth from "../../../auth/useAuth";

interface OTPScreenProps {
  navigation: any;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation }) => {
  const auth = useAuth();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; // Ensure only a single digit is entered
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if (index === 5 && text !== "") {
      verifyOtp(newOtp.join(""));
      return;
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index !== 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }

    // else if (
    //   e.nativeEvent.key === "Backspace" &&
    //   otp[index] !== "" &&
    //   index !== 0
    // ) {
    //   const newOtp = [...otp];
    //   newOtp[index] = "";
    //   setOtp(newOtp);
    //   inputRefs.current[index - 1]?.focus();
    // }
  };

  const verifyOtp = async (enteredOtp: string) => {
    // TODO: Call your API with enteredOtp
    console.log("Entered OTP:", enteredOtp);
    // Example API call
    // const response = await apiClient.post('/verify-otp', { otp: enteredOtp });
    // if (response.ok) {
    //   Alert.alert('Success', 'OTP Verified');
    //   navigation.navigate('NextScreen');
    // } else {
    //   Alert.alert('Error', 'Invalid OTP');
    // }
  };

  return (
    <View style={styles.container}>
      <Button
        position="absolute"
        right={50}
        top={50}
        onPress={() => auth.logOut()}
      >
        <ButtonText>Logout</ButtonText>
      </Button>

      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </View>

      <Button
        isDisabled={otp.join("").length !== 6}
        mt={"$10"}
        onPress={() => verifyOtp(otp.join(""))}
      >
        <ButtonText>Verify OTP</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HEIGHT,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 150,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#000",
    width: "13%",
    textAlign: "center",
    fontSize: 24,
  },
});

export default OTPScreen;
