import React from 'react';
// @ts-ignore
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Root';
// @ts-ignore
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import HomeView from '../views/home';
import DetailsView from '../views/details';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MainStack.Screen name="HomeScreen" component={HomeView} />
      <MainStack.Screen name="DetailsScreen" component={DetailsView} />
    </MainStack.Navigator>
  );
}

function ApplicationNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <RootStack.Screen name="Main" component={MainStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
