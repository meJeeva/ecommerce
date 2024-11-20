import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { getAllOfferBannerApi } from '../api/api';
import { styled } from 'nativewind';

const StyledImage = styled(Image);
const profileSettingList = [
    {
        title: 'My Orders',
        subTitles: 'View, track, cancel, return orders',
        image: 'box',
        vcIconName: 'Feather'
    },
    {
        title: 'Change Language',
        subTitles: 'English,',
        image: 'box',
        vcIconName: 'Feather'
    },
    {
        title: 'My Orders',
        subTitles: 'View, track, cancel, return orders',
        image: 'box',
        vcIconName: 'Feather'
    },
]

const ProfileScreen = () => {
    const [state, setState] = useState({
        offerBanner: []
    })

    useEffect(() => {
        initialFunctions();
    }, []);

    const initialFunctions = () => {
        Promise.all([getAllOffers()])
            .then(() => { })
            .catch(error => {
                console.log('Error fetching initial data:', error.message || error);
            });
    };

    const getAllOffers = async () => {
        try {
            let type = 'profile';
            const response = await getAllOfferBannerApi(type);
            setState(prev => ({ ...prev, offerBanner: response?.data || [] }));
        } catch (error) {
            console.log(error.message || error);
        }
    };


    return (
        <View className='flex-1 bg-white'>
            <Text className='font-montserrat-sb text-base mt-5 py-4 mx-5'>My Account</Text>
            <Divider />
            <View className='flex-row items-center justify-between my-3'>
                <View className='w-1.5/12 mx-3'>
                    <FontAwesome name="user-circle-o" size={45} />
                </View>
                <TouchableOpacity className='p-4 bg-red-400 rounded flex-1 mx-3 py-2'>
                    <Text className='text-white font-montserrat-rg text-base text-center'>Login/Sign up</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={state.offerBanner}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <TouchableOpacity className="">
                                <StyledImage
                                    source={{
                                        uri: item.image ? item.image : IMAGES.noImage,
                                    }}
                                    className="min-w-full h-32 resize-none"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <View>

            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})