import { View, Text, ScrollView, HStack, VStack } from "@gluestack-ui/themed";
import React, { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../../Constants/Constants";

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
          <View
            key={listItem}
            minWidth={"$11"}
            bg={COLORS.secondary}
            borderRadius={15}
            m={"$2"}
            elevation={5}
            alignItems="center"
            justifyContent="center"
          >
            <TouchableOpacity onPress={() => onPressFunction(listItem)}>
              <Text p={"$3"} color={COLORS.tertiary}>
                {listItem}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default ScrollBadges;
