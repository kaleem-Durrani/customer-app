import { View, Text, ScrollView, HStack, VStack } from "@gluestack-ui/themed";
import React, { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";

const ScrollBadges = ({ list, onPressFunction }: any) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      // Scroll to a specific position after the component has mounted
      scrollViewRef.current.scrollTo({ y: 108, animated: true }); // Adjust y to the desired position
    }
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      mt={"$3"}
      h={"$24"}
    >
      <VStack>
        {list.map((listItem: any) => (
          <LinearGradient
            key={listItem}
            colors={[
              COLORS.secondary,
              COLORS.primary,
              COLORS.secondary,
              COLORS.primary,
              COLORS.secondary,
            ]}
            start={[0.4, -0.5]}
            end={[1, 0.9]}
            style={{
              minWidth: PERCENT[5],
              margin: PERCENT[2],
              backgroundColor: COLORS.primary,
              elevation: 1,
              borderRadius: PERCENT[5],
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => onPressFunction(listItem)}>
              <Text fontWeight="bold" p={"$3"} color={COLORS.tertiary}>
                {listItem}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default ScrollBadges;
