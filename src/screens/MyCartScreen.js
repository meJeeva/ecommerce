import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../utils/constants';

const MyCartScreen = () => {
    return (
        <View className='flex-1 bg-white'>
            <Text className='font-montserrat-sb text-base mt-5 py-4 mx-5'>My Account</Text>
            <Divider />
            <View className='bg-slate-50 flex-1'>
                <View className='flex-row bg-cyan-100 m-3 p-2 border-dotted border-cyan-700 rounded-md'>
                    <View className='w-8'>
                        <Feather name="truck" size={22} color={COLORS.red} />
                    </View>
                    <Text className='font-montserrat-rg'><Text className='text-cyan-400'>FREE Delivery</Text> on all orders</Text>
                </View>
                <View>

                </View>
            </View>
        </View>
    )
}

export default MyCartScreen

const styles = StyleSheet.create({})