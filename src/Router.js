import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Nearby from './Pages/Nearby';
import 'react-native-gesture-handler';
import Favorites from './Pages/Favorites';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView from './Pages/MapViews/MapViews';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarIconStyle: {display: 'none'},
            tabBarLabelStyle: {fontWeight: 'bold', fontSize: 20, margin: 10},
          }}>
          <Tab.Screen name="Nearby" component={Nearby} />
          <Tab.Screen
            name="MapView"
            component={MapView}
            options={{
              tabBarLabel: 'Map View',
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            screenOptions={{headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Router;
