import { View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Dimensions } from "react-native";

const MiniMap = () => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    let headingSubscription: Location.LocationSubscription | null = null;

    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setPermissionDenied(true);
          return;
        }

        setPermissionDenied(false);

        // Initial location
        let initialLocation = await Location.getCurrentPositionAsync({});
        setLocation(initialLocation.coords);

        // Watch location updates
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 200, // Update every 0.2 second
            distanceInterval: 3, // Update every 3 meters
          },
          (newLocation) => {
            setLocation(newLocation.coords);
          }
        );

        // Watch heading updates
        headingSubscription = await Location.watchHeadingAsync((newHeading) => {
          setHeading(newHeading.trueHeading);
        });
      } catch (error) {
        setErrorMsg(
          "Location request failed due to unsatisfied device settings"
        );
        setPermissionDenied(true);
      }
    };

    requestLocationPermission();

    // Clean up the subscription on component unmount
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (headingSubscription) {
        headingSubscription.remove();
      }
    };
  }, []);

  const handleRetryPermission = async () => {
    setPermissionDenied(false);
    setErrorMsg(null);
    await requestLocationPermission();
  };

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setPermissionDenied(true);
        return;
      }

      setPermissionDenied(false);

      // Initial location
      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation.coords);

      // Watch location updates
      let locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 200, // Update every 0.2 second
          distanceInterval: 3, // Update every 3 meters
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      // Watch heading updates
      let headingSubscription = await Location.watchHeadingAsync(
        (newHeading) => {
          setHeading(newHeading.trueHeading);
        }
      );
    } catch (error) {
      setErrorMsg("Location request failed due to unsatisfied device settings");
      setPermissionDenied(true);
    }
  };

  if (permissionDenied) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
        <Button onPress={handleRetryPermission}>
          <ButtonText>Load Map</ButtonText>
        </Button>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005, // Adjust zoom level
          longitudeDelta: 0.005, // Adjust zoom level
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005, // Adjust zoom level
          longitudeDelta: 0.005, // Adjust zoom level
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={true}
        camera={{
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          pitch: 45, // Tilt angle
          heading: heading || 0, // Dynamic heading based on user's direction
          altitude: 1000, // Adjust as needed
          zoom: 15, // Fixed zoom level
        }}
        showsMyLocationButton={false}
        showsScale={true}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsBuildings={true}
        showsTraffic={false}
        loadingEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: Dimensions.get("window").width * 0.9, // or any other specific width
    height: Dimensions.get("window").height / 2, // or any other specific height
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiniMap;
