import CatalogScreen from "@/src/screens/CatalogScreen";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Home() {

    return (
        <View>
            <CatalogScreen />
            <Link href={"/cerrhud-lab"}>Go to lab</Link>
        </View>
    );
}