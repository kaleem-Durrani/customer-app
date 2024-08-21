import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import {
  View,
  Text,
  ScrollView,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import Mapbox from "@rnmapbox/maps";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import customerApis from "../../api/customer";
import useApi from "../../hooks/useApi";
import { MAPBOX_ACCESS_TOKEN } from "@env";
import TopRibbon from "../../components/TopRibbon";
import { NetworkStatusBadge } from "../../components/NetworkBadge";
import * as Location from "expo-location";

interface Pump {
  _id: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
}

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapLocator = ({ navigation }: any) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [cameraCenter, setCameraCenter] = useState<[number, number]>([
    66.996452, 30.18327,
  ]);
  const [cameraZoom, setCameraZoom] = useState<number>(12);
  const [route, setRoute] = useState<null | number[][]>(null);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [selectedPumpId, setSelectedPumpId] = useState<number | null>(null);
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  const getPumpLocationsApi = useApi(customerApis.getPumpLocations);

  useEffect(() => {
    const fetchPumpLocations = async () => {
      await getPumpLocationsApi.request();
    };
    fetchPumpLocations();
  }, []);

  useEffect(() => {
    if (getPumpLocationsApi.data) {
      setPumps(getPumpLocationsApi.data.pumps);
      return;
    }
    if (getPumpLocationsApi.error) {
      console.error(
        "Error fetching pump locations:",
        getPumpLocationsApi.error
      );
      return;
    }
  }, [getPumpLocationsApi.data, getPumpLocationsApi.error]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message: "This app needs access to your location.",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setLocationPermission(true);
            console.log("Location permission granted");
          } else {
            setLocationPermission(false);
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
          setLocationPermission(false);
        }
      } else if (Platform.OS === "ios") {
        // For iOS, you might need to use a library like react-native-permissions
        // or implement the iOS-specific permission request here
        setLocationPermission(true); // Assuming permission is granted for iOS
      }
    };

    requestLocationPermission();
  }, []);

  const fetchRoute = async (start: number[], end: number[]) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`,
      { method: "GET" }
    );
    const json = await query.json();

    return json.routes[0];
  };

  const onPressMap = async (e: any, pumpId: number) => {
    if (pumpId === selectedPumpId) {
      setSelectedPumpId(null);
      setRoute(null);
      setInstructions([]);
      return;
    }
    setSelectedPumpId(pumpId);
    const clickedPoint = e.geometry.coordinates;
    if (userLocation) {
      try {
        const routeData = await fetchRoute(userLocation, clickedPoint);
        if (routeData.geometry.coordinates === route) {
          setRoute(null);
          setInstructions([]);
          return;
        }
        setRoute(routeData.geometry.coordinates);
        setInstructions(
          routeData.legs[0].steps.map((step: any) => step.maneuver.instruction)
        );
      } catch (error) {
        Alert.alert(
          "Error fetching route:",
          "Distance Can't be More than 10,000 Miles"
        );
      }
    } else {
      Alert.alert(
        "Location is Off!",
        "Please ensure that the location permission is granted and location is on."
      );
      console.warn("User location not available");
    }
  };

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync();
      setUserLocation([location.coords.longitude, location.coords.latitude]);
      console.log(location.coords.longitude, location.coords.latitude);
      setCameraCenter([location.coords.longitude, location.coords.latitude]);
      setCameraZoom(13);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    if (userLocation) {
      setCameraCenter(userLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    if (locationPermission) {
      getLocation();
    }
  }, [locationPermission]);

  return (
    <View style={styles.matchParent}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Pump Locator"} />
      <Mapbox.MapView
        style={styles.matchParent}
        compassEnabled={true}
        logoEnabled={false}
        attributionEnabled={false}
        onDidFinishLoadingMap={() => console.log("Map has loaded")}
      >
        <Mapbox.Camera centerCoordinate={cameraCenter} zoomLevel={cameraZoom} />

        {locationPermission && (
          <Mapbox.UserLocation
            onUpdate={(location) => {
              if (location && location.coords) {
                setUserLocation([
                  location.coords.longitude,
                  location.coords.latitude,
                ]);
              }
            }}
            minDisplacement={10}
          />
        )}

        {pumps &&
          pumps.map((pump) => (
            <Mapbox.PointAnnotation
              title={pump.name}
              key={pump._id.toString()} // Convert _id to string to fix the key type issue
              id={`marker-${pump._id}`}
              coordinate={[
                pump.coordinates.longitude,
                pump.coordinates.latitude,
              ]}
              onSelected={(e) => onPressMap(e, pump._id)}
            >
              <FontAwesome5 name="gas-pump" size={30} color="red" />
            </Mapbox.PointAnnotation>
          ))}

        {route && (
          <Mapbox.ShapeSource
            id="routeSource"
            shape={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: route,
              },
            }}
          >
            <Mapbox.LineLayer
              id="routeFill"
              style={{
                lineColor: "blue",
                lineWidth: 3,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>
      <Button
        variant="solid"
        onPress={() => {
          if (userLocation && locationPermission) {
            getLocation();
            setCameraCenter(userLocation);
            setCameraZoom(13); // Increased zoom level for better visibility
            // setRoute(null); // Clear the route when "My Location" is pressed
            setInstructions([]); // Clear the instructions when "My Location" is pressed
          } else if (!locationPermission) {
            Alert.alert(
              "Location Permission Denied",
              "Please grant location permission in your device settings to use this feature."
            );
          } else {
            Alert.alert(
              "Location Unavailable",
              "Unable to get your current location. Please make sure your device's location services are enabled."
            );
          }
        }}
      >
        <ButtonText>My Location</ButtonText>
      </Button>

      {instructions.length > 0 && (
        <ScrollView style={styles.instructionsContainer}>
          <Text>Turn-by-turn instructions:</Text>
          {instructions.map((instruction, index) => (
            <Text key={index}>
              {index + 1}. {instruction}
            </Text>
          ))}
          <Button my={"$10"} onPress={() => setInstructions([])}>
            <ButtonText>Hide</ButtonText>
          </Button>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  matchParent: { flex: 1 },
  instructionsContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    maxHeight: 200,
    overflow: "scroll",
    // paddingBottom: HEIGHT * 0.5,
  },
  marker: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MapLocator;
