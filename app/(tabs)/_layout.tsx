import CTabBottomBar from "@/src/components/ui/CTabBottomBar";
import { BottomBarItems } from "@/src/constants/navigation";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CTabBottomBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "white",
        sceneStyle: {
          // backgroundColor: colors.background.DEFAULT,
        },
      }}
    >
      {BottomBarItems.map((item) => {
        return (
          <Tabs.Screen
            name={item.id}
            options={{ headerShown: false, title: `${item.title}` }}
          />
        );
      })}
    </Tabs>
  );
}
