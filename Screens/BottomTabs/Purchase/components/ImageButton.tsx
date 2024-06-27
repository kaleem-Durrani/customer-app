import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, PERCENT } from "../../../../Constants/Constants";

const ImageButton = ({
  image,
  alt,
  title,
  myNumber,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: any) => {
  const sizeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the size based on the selectedPaymentMethod
    Animated.timing(sizeAnim, {
      toValue: selectedPaymentMethod === alt ? 1 : 0,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, [selectedPaymentMethod]);

  const size = sizeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [PERCENT[16], PERCENT[22]], // sm and md sizes in pixels, you can adjust these values
  });

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginBottom: "2%",
        borderRadius: 20,
      }}
      onPress={() => setSelectedPaymentMethod(alt)}
    >
      <Animated.Image
        style={{
          backgroundColor:
            selectedPaymentMethod === myNumber
              ? COLORS.secondary
              : "transparent",
          width: size,
          height: size,
          borderWidth: 1,
          borderColor: selectedPaymentMethod === alt ? COLORS.tertiary : "gray",
          borderRadius: 15,
        }}
        source={image}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 12,
          color: selectedPaymentMethod === alt ? COLORS.tertiary : "gray",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageButton;
