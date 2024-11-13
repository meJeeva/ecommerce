import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MyCartScreen from '../screens/MyCartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'HomeScreen') {
                        return <AntDesign name={'home'} size={23} color={focused ? 'red' : 'grey'} />;
                    } else if (route.name === 'CategoryScreen') {
                        return <MaterialIcons name={'category'} size={23} color={focused ? 'red' : 'grey'} />;
                    } else if (route.name === 'ProfileScreen') {
                        return <FontAwesome name={'user-circle-o'} size={23} color={focused ? 'red' : 'grey'} />;
                    } else if (route.name === 'MyCartScreen') {
                        return <Feather name={'shopping-cart'} size={23} color={focused ? 'red' : 'grey'} />;
                    }
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name='HomeScreen'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    title: "Home"
                }}
            />
            <Tab.Screen name='CategoryScreen' component={CategoryScreen} options={{
                headerShown: false,
                title: "Category"
            }} />
            <Tab.Screen name='MyCartScreen' component={MyCartScreen} options={{
                headerShown: false,
                title: "Cart"
            }} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{
                headerShown: false,
                title: "Profile"
            }} />
        </Tab.Navigator>
    )
}

export default BottomTabScreen

const styles = StyleSheet.create({})