import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Home from '../screens/home';
import Pix from '../screens/pix';
import Extract from '../screens/extract';
import Tax from '../screens/tax';
import Turn from '../screens/turn';
import Broker from '../screens/broker';
import Casino from '../screens/casino';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return <NavigationContainer>
        <StatusBar style='light' />
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Pix" component={Pix} />
            <Stack.Screen name="Extract" component={Extract} />
            <Stack.Screen name="Tax" component={Tax} />
            <Stack.Screen name="Turn" component={Turn} />
            <Stack.Screen name="Broker" component={Broker} />
            <Stack.Screen name="Casino" component={Casino} />
        </Stack.Navigator>
    </NavigationContainer>
}