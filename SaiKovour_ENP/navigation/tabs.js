import React from "react";
import {View, Text, useState} from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import HomeScreen from '../screens/HomeScreen'
import ImportScreen from '../screens/ImportScreen'
import FacesScreen from '../screens/FacesScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CameraScreen from "../screens/CameraScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {

  const [homeName, setHomeIcon] = React.useState('home')
  const [importName, setImportIcon] = React.useState('file-image')
  const [facesName, setFacesIcon] = React.useState('view-list')
  const [settingsName, setSettingsIcon] = React.useState('cog')



    return(
        <Tab.Navigator
        screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#004346',
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 20,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: '0.06',
          shadowOffset: {
            width: 15,
            height: 15
          },
          paddingTop: 10,
        }
          }}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                      <MaterialCommunityIcons name={focused ? 'home': 'home-outline'} color={focused ? '#FFF' : '#767676'} size={35} />
                    ),
                }}
                />
            <Tab.Screen 
                name="Import" 
                component={ImportScreen}
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                      <MaterialCommunityIcons name={focused ? 'file-image': 'file-image-outline'} color={focused ? '#FFF' : '#767676'} size={35} />
                    ),
                }} />
            <Tab.Screen 
                name="Camera" 
                component={CameraScreen}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({focused, color, size}) => (
                    <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "black",
                      width: Platform.OS == "ios" ? 80 : 60,
                      height: Platform.OS == "ios" ? 80 : 60,
                      top: Platform.OS == "ios" ? -10 : -20,
                      borderRadius: Platform.OS == "ios" ? 30 : 30
                     }}>
                      <MaterialCommunityIcons name={focused ? 'camera': 'camera-outline'} color={color} size={45} />
                    </View>
                  ),
                  tabBarIconStyle: {},
                }} />
            <Tab.Screen 
                name="Faces" 
                component={FacesScreen} 
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                      <MaterialCommunityIcons name={focused ? 'view-list': 'view-list-outline'} color={focused ? '#FFF' : '#767676'} size={35} />
                    ),
                }}/>
            <Tab.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{
                    tabBarIcon: ({focused, color, size }) => (
                      <MaterialCommunityIcons name={focused ? 'cog': 'cog-outline'} color={focused ? '#FFF' : '#767676'} size={35} />
                    ),
                }}/>
        </Tab.Navigator>
    )
}

export default Tabs;