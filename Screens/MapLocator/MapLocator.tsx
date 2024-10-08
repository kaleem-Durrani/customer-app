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
  const [userLocation, setUserLocation] = useState(null);
  const [cameraCenter, setCameraCenter] = useState([66.996452, 30.18327]);
  const [cameraZoom, setCameraZoom] = useState(12);
  const [route, setRoute] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [pumps, setPumps] = useState<Pump[]>([]);

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
        } catch (err) {
          console.warn(err);
        }
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

  const onPressMap = async (e: any) => {
    const clickedPoint = e.geometry.coordinates;
    if (userLocation) {
      try {
        const routeData = await fetchRoute(userLocation, clickedPoint);
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

  return (
    <View style={styles.matchParent}>
      <NetworkStatusBadge />
      <TopRibbon navigation={navigation} title={"Pump Locator"} />
      <Mapbox.MapView
        style={styles.matchParent}
        onDidFinishLoadingMap={() => console.log("Map has loaded")}
      >
        <Mapbox.Camera centerCoordinate={cameraCenter} zoomLevel={cameraZoom} />

        <Mapbox.UserLocation
          onUpdate={(location) =>
            setUserLocation([
              location.coords.longitude,
              location.coords.latitude,
            ])
          }
        />

        {pumps &&
          pumps.map((pump) => (
            <Mapbox.PointAnnotation
              title={pump.name}
              key={pump._id}
              id={`marker-${pump._id}`}
              coordinate={[
                pump.coordinates.longitude,
                pump.coordinates.latitude,
              ]}
              onSelected={onPressMap}
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
          if (userLocation) {
            setCameraCenter([userLocation[0], userLocation[1]]);
            setCameraZoom(12); // You can adjust the zoom level as needed
          } else {
            Alert.alert(
              "Location is Off!",
              "Please ensure that the location permission is granted and location is on."
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
