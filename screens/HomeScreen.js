import { Button, StyleSheet, Text, View  } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from "./Dashboard";
import ProfileScreen from "./ProfileScreen";
import ScanScreen from "./ScanScreen";


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
       <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'home';
          else if (route.name === 'Scan') iconName = 'scan-circle';
          else if (route.name === 'Account') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen


