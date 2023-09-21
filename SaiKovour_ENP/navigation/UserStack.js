import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from '../navigation/tabs'

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}