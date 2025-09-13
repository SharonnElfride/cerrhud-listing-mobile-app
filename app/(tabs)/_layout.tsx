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
    <Tabs screenOptions={{ tabBarActiveTintColor: 'primary' }}>

      {/* <FontAwesomeIcon icon={faFlaskVial} /> */}
      {/* <FontAwesomeIcon icon={faCalendarCheck} /> */}
      <Tabs.Screen name="index" options={{ headerShown: false, title: "Examens" }} />


    {/* 
    
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,


          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
    
    */}

      <Tabs.Screen name="book-appointment" options={{ headerShown: false, title: "Prendre un rdv" }} />
    </Tabs>
  );
}
