import colors from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Camera, MapView, MarkerView } from "@maplibre/maplibre-react-native";
import { Pressable, View } from "react-native";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { openMap } from "../utils/maps";

const MapPreview = () => {
  const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

  return (
    <MapView
      style={{
        flex: 1,
        width: "100%",
        height: 200,
        borderRadius: 10,
      }}
      mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`}
      logoEnabled={false}
      attributionPosition={{ bottom: 8, right: 8 }}
    >
      <Camera
        // [lng, lat]
        centerCoordinate={[2.4072755423278482, 6.360366826115449]}
        zoomLevel={16}
        animationDuration={1500}
        animationMode="easeTo"
      />

      <MarkerView
        coordinate={[
          CerrhudLabData.coordinates.longitude,
          CerrhudLabData.coordinates.latitude,
        ]}
        anchor={{ x: 0.5, y: 1 }}
      >
        <View
          style={{
            width: 25,
            height: 25,
          }}
        >
          <Pressable
            onPress={() =>
              openMap(
                CerrhudLabData.coordinates.latitude,
                CerrhudLabData.coordinates.longitude
              )
            }
          >
            <Ionicons name="pin" size={30} color={colors.primary.DEFAULT} />
          </Pressable>
        </View>
      </MarkerView>
    </MapView>
  );
};

export default MapPreview;
