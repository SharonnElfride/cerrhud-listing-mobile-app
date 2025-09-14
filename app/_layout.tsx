import colors from "@/colors";
import IconButton from "@/src/components/buttons/IconButton";
import { TopBarItem } from "@/src/constants/navigation";
import { IconButtonSize } from "@/src/constants/shared";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { RobotoSerif_700Bold, useFonts } from "@expo-google-fonts/roboto-serif";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    RobotoSerif_700Bold,
    Poppins_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary.DEFAULT },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "700",
            fontFamily: "RobotoSerif_700Bold",
          },
          contentStyle: {
            backgroundColor: colors.background.DEFAULT,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            title: `${TopBarItem.title}`,
            headerTitle: () => (
              <Text className="font-title uppercase font-bold text-2xl text-white">
                {TopBarItem.title}
              </Text>
            ),
            headerRight: () => (
              <Link href={"/cerrhud-lab"}>
                <Ionicons
                  name="information-circle-outline"
                  size={IconButtonSize}
                  color="#fff"
                />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="cerrhud-lab"
          options={{
            title: `${TopBarItem.title}`,
            headerRight: () => (
              // <Pressable onPress={() => alert("Home action!")}>
              //   <Ionicons name="add-circle-outline" size={24} color="#fff" />
              // </Pressable>
              <IconButton icon="call-outline" onPress={() => {}} />
            ),
          }}
        />
      </Stack>
    </View>
  );
}

/*
  import { Platform } from 'react-native';
  // Inside a React component:
  <Text
    style={{
      fontFamily: Platform.select({
        android: 'Inter_900Black',
        ios: 'Inter-Black',
      }),
    }}>
    Inter Black
  </Text>
*/
