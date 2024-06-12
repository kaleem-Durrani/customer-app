import { View, Text, ScrollView, HStack } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../../Constants/Constants";

const ScrollBadges = ({ list, onPressFunction }: any) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} mt={"$3"}>
      <HStack>
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
      </HStack>
    </ScrollView>
  );
};

export default ScrollBadges;
