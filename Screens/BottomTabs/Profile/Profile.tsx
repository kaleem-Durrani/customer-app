import {
  View,
  Text,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  ScrollView,
  Pressable,
} from "@gluestack-ui/themed";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import RecordCard from "./components/RecordCard";
import NavigationCard from "./components/NavigationCard";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../../../auth/useAuth";
import customerApis from "../../../api/customer";
import useApi from "../../../hooks/useApi";
import ProfileContext from "../../../Contexts/ProfileContext";
import useProfile from "../../../hooks/useProfile";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { NetworkStatusBadge } from "../../../components/NetworkBadge";

const Profile = ({ navigation }: any) => {
  const { logOut } = useAuth();
  const { profile } = useProfile();
  const [image, setImage] = useState(null);
  const uploadImageApi = useApi(customerApis.uploadImage);

  const uploadProfile = async (cropped) => {
    await uploadImageApi.request(cropped);
  };

  useEffect(() => {
    if (uploadImageApi.data) {
      console.log("Image uploaded successfully");
    }
    if (uploadImageApi.error) {
      console.log("Error uploading image: ", uploadImageApi.error);
    }
  }, [uploadImageApi.data, uploadImageApi.error]);

  const pickImage = async (source) => {
    let result;
    if (source === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.25,
        });
      } else {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.25,
      });
    }

    if (!result.canceled) {
      const base64Image = await convertImageToBase64(result.assets[0].uri);
      uploadProfile(base64Image);
      setImage(base64Image);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Select Image Source",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Camera", onPress: () => pickImage("camera") },
        { text: "Gallery", onPress: () => pickImage("gallery") },
      ],
      { cancelable: true }
    );
  };

  return (
    <View mt={"$0"} bg={COLORS.primary} flex={1}>
      <NetworkStatusBadge />
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary, COLORS.secondary]}
        start={[0.4, -0.4]}
        end={[1, 1]}
        style={{
          elevation: 3,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          width: "100%",
          height: "20%",
        }}
      >
        <Text alignSelf="center" size="4xl" fontWeight="bold" mt={"$4"}>
          Profile
        </Text>
        <Entypo
          name="log-out"
          size={PERCENT[10]}
          color={COLORS.tertiary}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            borderWidth: 3,
            borderColor: COLORS.tertiary,
            borderRadius: PERCENT[100],
            paddingLeft: PERCENT[3],
            paddingTop: PERCENT[2],
            alignSelf: "center",
          }}
        />
      </LinearGradient>
      <Avatar size="2xl" alignSelf="center" mt={"-15%"} elevation={6}>
        <AvatarFallbackText>{profile?.name}</AvatarFallbackText>
        <AvatarImage
          alt="your profile pic"
          source={{
            uri:
              image ||
              profile?.imageUrl ||
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1723481456~exp=1723485056~hmac=9bdd0d4ede97b83ce78dcf1d40f4391f0b8ec1585889d7e3cf8367ef03580734&w=740",
          }}
        />
        <Pressable onPress={showImagePickerOptions}>
          <Entypo
            name="camera"
            size={35}
            style={{ marginLeft: PERCENT[25], marginTop: PERCENT[8] }}
            color={COLORS.tertiary}
          />
        </Pressable>
      </Avatar>
      <Text fontWeight="bold" alignSelf="center">
        {profile ? profile.name : "Loading..."}
      </Text>
      <Text color="gray" size="2xs" alignSelf="center">
        {profile ? profile.email : "Loading..."}
      </Text>

      <ScrollView mx={"$3"} showsVerticalScrollIndicator={false}>
        <HStack justifyContent="space-evenly" py={"$2"}>
          <RecordCard
            image={require("../../../assets/images/oil.png")}
            title={"Fuel Bought"}
            amount={500}
          />
          <RecordCard
            image={require("../../../assets/images/money.png")}
            title={"Total Points"}
            amount={500}
          />
          <RecordCard
            image={require("../../../assets/images/points.png")}
            title={"Money Saved"}
            amount={500}
          />
        </HStack>
        <View p={"$2"}>
          <NavigationCard
            name={"user"}
            title={"Personal Details"}
            onPress={() => navigation.navigate("PersonalDetails")}
          />
          <NavigationCard
            name={"lock"}
            title={"Change Password"}
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <NavigationCard
            name={"bell"}
            title={"Notifications"}
            onPress={() => navigation.navigate("Notifications")}
          />
          <NavigationCard
            name={"chat"}
            title={"Customer Support"}
            onPress={() => navigation.navigate("CustomerSupport")}
          />
          <NavigationCard
            name={"documents"}
            title={"Privacy Policy"}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <NavigationCard
            name={"log-out"}
            title={"Logout"}
            onPress={() => logOut()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
