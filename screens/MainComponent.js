// import { useState } from "react";
import { Platform, View } from "react-native"; //platform helps retrieve the OS of the device used
import CampsiteInfoScreen from "./CampsiteInfoScreen";
// import { CAMPSITES } from "../shared/campsites";
import DirectoryScreen from "./DirectoryScreen";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Directory"
      // default route this navigator uses when first loading
      screenOptions={screenOptions}
      // define the look and feel of nav header
    >
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen} // component to be rendered
        options={{ title: "Campsite Directory" }} // will be displayed in nav header
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name,
        })}
        // route and navigation property are avail from react-nav-library
        //this will set title of campsite info screen the name of the specific campsite
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{ title: "Directory" }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
