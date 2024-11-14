import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-paper';
import { getAllCategoriesApi } from '../api/api';

const CategoryScreen = () => {
    const [state, setState] = useState({
        categories: []
    });

    useEffect(() => {
        initialFunction();
    }, []);

    const initialFunction = async () => {
        Promise.all([getAllCategories()])
            .then(() => { })
            .catch(error => {
                console.log('Error fetching initial data:', error.message || error);
            });
    }

    const getAllCategories = async () => {
        try {
            const response = await getAllCategoriesApi();
            setState(prev => ({ ...prev, categories: response?.data || [] }));
        } catch (error) {
            console.log(error.message || error);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <View className='my-5 flex-row mx-3 justify-between'>
                <Text className='font-montserrat-sb text-base'>Top Categories</Text>
                <View>
                    <AntDesign name="search1" size={22} />
                </View>
            </View>
            <Divider />
            <View className='flex-1 flex-row'>
                <View className='flex-1 w- bg-red-200'>
                    <FlatList
                        data={state.categories}
                        renderItem={({ item, index }) => <RenderCategories item={item} index={index} />}
                    />
                </View>
                <View className='flex-1 w-10/12 bg-orange-400'>

                </View>
            </View>
        </View>
    )
}

const RenderCategories = ({ item, index }) => {
    return (
        <View key={index}>
            <Text>{item.categoryName}</Text>
        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({})