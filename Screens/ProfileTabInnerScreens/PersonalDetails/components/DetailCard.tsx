import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
interface DetailCardProps {
  title: string;
  info: string;
}

const DetailCard = ({ title, info }: DetailCardProps) => {
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary, COLORS.secondary]}
      start={[0, -1]}
      end={[1, 1]}
      style={{
        elevation: 3,
        backgroundColor: "white",
        marginBottom: PERCENT[3],
        borderRadius: 5,
      }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <Text>{info}</Text>
      </View>
    </LinearGradient>
  );
};

export default DetailCard;
