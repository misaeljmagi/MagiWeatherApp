import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './src/mobile/screens/HomeScreen';
import LocationsScreen from './src/mobile/screens/LocationsScreen';

import AddLocationScreen from './src/mobile/screens/AddLocationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './RootNavigation';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const LocationsStack = createNativeStackNavigator();
const AddLocationStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </HomeStack.Navigator>
);

const LocationsStackScreen = () => (
  <LocationsStack.Navigator>
    <LocationsStack.Screen
      name="LocationsScreen"
      component={LocationsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AddLocation"
      component={AddLocationStackScreen}
      options={{headerShown: false}}
    />
  </LocationsStack.Navigator>
);

const AddLocationStackScreen = () => (
  <AddLocationStack.Navigator>
    <AddLocationStack.Screen
      name="AddLocationScreen"
      component={AddLocationScreen}
      options={{headerShown: false}}
    />
  </AddLocationStack.Navigator>
);
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Locations" component={LocationsStackScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
