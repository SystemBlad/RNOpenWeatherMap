import React from 'react';
// @ts-ignore
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Root';
// @ts-ignore
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, Text, View} from 'react-native';
import HomeView from '../views/home';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function DemoScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{'Under Construction'}</Text>
    </View>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MainStack.Screen name="HomeScreen" component={HomeView} />
      <MainStack.Screen name="DetailsScreen" component={DemoScreen} />
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
