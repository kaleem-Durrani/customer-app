import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { COLORS } from "../../Constants/Constants";
import TopRibbon from "../../components/TopRibbon";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import customerApis from "../../api/customer";
import useApi from "../../hooks/useApi";

interface Pump {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  brand: string;
}

const MapLocator: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  const getPumpLocationsApi = useApi(customerApis.getPumpLocations);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    let headingSubscription: Location.LocationSubscription | null = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Initial location
      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation.coords);
      getPumpLocationsApi.request();

      // Watch location updates
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 5, // Update every 5 meters
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      // Watch heading updates
      headingSubscription = await Location.watchHeadingAsync((newHeading) => {
        setHeading(newHeading.trueHeading);
      });
    })();

    // Clean up the subscription on component unmount
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (headingSubscription) {
        headingSubscription.remove();
      }
    };
  }, [selectedBrand]);

  // const fetchPumps = async (
  //   coords: Location.LocationObjectCoords,
  //   brand: string
  // ) => {
  //   const samplePumps: Pump[] = [
  //     {
  //       id: 1,
  //       latitude: coords.latitude + 0.01,
  //       longitude: coords.longitude + 0.01,
  //       name: "Shell Pump",
  //       brand: "shell",
  //     },
  //     {
  //       id: 2,
  //       latitude: coords.latitude - 0.01,
  //       longitude: coords.longitude - 0.01,
  //       name: "PSO Pump",
  //       brand: "pso",
  //     },
  //     // Add more sample pumps
  //   ];

  //   const filteredPumps =
  //     brand === "all"
  //       ? samplePumps
  //       : samplePumps.filter((pump) => pump.brand === brand);
  //   setPumps(filteredPumps);
  // };

  if (!location) {
    return (
      <View style={styles.container}>
        <TopRibbon navigation={navigation} title={"Pump Locator"} />
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopRibbon navigation={navigation} title={"Pump Locator"} />
      {/* <Select>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select Pump Brand" value={selectedBrand} />
          <SelectIcon mr="$3">
            <ChevronDownIcon />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem
              label="All"
              value="all"
              onPress={() => setSelectedBrand("all")}
            />
            <SelectItem
              label="Shell"
              value="shell"
              onPress={() => setSelectedBrand("shell")}
            />
            <SelectItem
              label="PSO"
              value="pso"
              onPress={() => setSelectedBrand("pso")}
            />

          </SelectContent>
        </SelectPortal>
      </Select> */}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsScale={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={true}
        loadingEnabled={true}
      >
        {getPumpLocationsApi.data &&
          getPumpLocationsApi.data.pumps.map((pump) => (
            <Marker
              key={pump._id}
              coordinate={{
                latitude: pump.coordinates.latitude,
                longitude: pump.coordinates.longitude,
              }}
              title={pump.name}
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    marginTop: -10,
  },
});

export default MapLocator;
