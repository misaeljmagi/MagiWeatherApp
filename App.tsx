import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import LocationsScreen from './src/mobile/screens/LocationsScreen';

import AddLocationScreen from './src/mobile/screens/AddLocationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import CustomIcon from './src/mobile/components/CustomIcon';
import WeatherDetailScreen from './src/mobile/screens/WeatherDetailScreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const WeatherDetailStack = createNativeStackNavigator();
const LocationsStack = createNativeStackNavigator();
const AddLocationStack = createNativeStackNavigator();

const WeatherDetailStackScreen = () => (
  <WeatherDetailStack.Navigator>
    <WeatherDetailStack.Screen
      name="WeatherDetailScreen"
      component={WeatherDetailScreen}
      options={{headerShown: false}}
    />
  </WeatherDetailStack.Navigator>
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
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({size}) => {
        let iconName;

        if (route.name === 'Weather Detail') {
          iconName = 'wb-sunny';
        } else if (route.name === 'Locations') {
          iconName = 'map';
        }

        return <CustomIcon name={iconName} size={size} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Weather Detail" component={WeatherDetailStackScreen} />
    <Tab.Screen name="Locations" component={LocationsStackScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
