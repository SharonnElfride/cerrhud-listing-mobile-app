import { Tabs } from "expo-router";

export default function TabLayout() {
  /*
<Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
        header: () => <Header />,
    }}
>
    <Tab.Screen
        ...

</Tab.Navigator>;

 <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My home',
        }}
      />
    </Stack.Navigator>
  );
*/

  // <Link href={"/cerrhud-lab"}>Go to lab</Link>
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="book-appointment" />
    </Tabs>
  );
}
