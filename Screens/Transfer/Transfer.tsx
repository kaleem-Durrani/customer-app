import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Transfer = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <View
        flexDirection="row"
        bg={COLORS.secondary}
        height={"$24"}
        alignItems="center"
        pl={"$5"}
        pr={"$12"}
        justifyContent="space-between"
        borderBottomRightRadius={PERCENT[8]}
        borderBottomLeftRadius={PERCENT[8]}
        elevation={5}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: PERCENT[1],
            borderWidth: 2,
            borderColor: COLORS.tertiary,
            borderRadius: PERCENT[100],
          }}
        >
          <FontAwesome
            name="long-arrow-left"
            size={PERCENT[8]}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>
        <Text size="xl" fontWeight="bold">
          Transfer Funds
        </Text>
      </View>
    </View>
  );
};

export default Transfer;
