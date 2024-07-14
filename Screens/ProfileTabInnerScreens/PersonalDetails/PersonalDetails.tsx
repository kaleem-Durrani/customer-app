import { View, Text, HStack } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import TopRibbon from "../../../components/TopRibbon";
import { LinearGradient } from "expo-linear-gradient";
import DetailCard from "./components/DetailCard";

const PersonalDetails = ({ navigation }: any) => {
  return (
    <View bg={COLORS.primary} flex={1}>
      <TopRibbon navigation={navigation} title={"Personal Details"} />

      <LinearGradient
        colors={[COLORS.tertiary, COLORS.primary, COLORS.tertiary]}
        start={[1, -0.7]}
        end={[0.7, 0.8]}
        style={{
          elevation: 5,
          flex: 1,
          marginTop: -PERCENT[6],
        }}
      >
        <View mt={"$16"} mx={"$6"}>
          <DetailCard title={"Name"} info={"John"} />
          <DetailCard title={"Email"} info={"John@gmail.com"} />
          <DetailCard title={"Phone Number"} info={"090078601"} />
          {/* <DetailCard title={"Email"} info={"John@gmail.com"} /> */}

          <HStack gap={"$12"} mt={"$6"}>
            <View
              py={"$3"}
              flex={1}
              bg={COLORS.primary}
              alignItems="center"
              justifyContent="center"
              elevation={5}
              borderRadius={PERCENT[3]}
            >
              <Text size="md" fontWeight="bold">
                Balance
              </Text>
              <Text size="xl" color={COLORS.activeText} fontWeight="bold">
                100
              </Text>
            </View>

            <View
              py={"$3"}
              flex={1}
              bg={COLORS.primary}
              alignItems="center"
              justifyContent="center"
              elevation={5}
              borderRadius={PERCENT[3]}
            >
              <Text size="md" fontWeight="bold">
                Points
              </Text>
              <Text size="xl" color={COLORS.activeText} fontWeight="bold">
                100
              </Text>
            </View>
          </HStack>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PersonalDetails;
