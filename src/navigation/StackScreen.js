import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import MyCartScreen from '../screens/MyCartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import { BottomNavigation } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='BottomNavigation'
                component={BottomNavigation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='SplashScreen'
                component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='MyCartScreen'
                component={MyCartScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='CategoryScreen'
                component={CategoryScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default StackScreen
