import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Bubble = ({ children }) => {
  return <View style={styles.bubble}>{children}</View>;
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 5,
    margin: 10,
  },
});

export default Bubble;
