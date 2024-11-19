import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-paper';
import { getAllCategoriesApi, getAllSubCategoriesApi } from '../api/api';
import { styled } from 'nativewind';
import { IMAGES } from '../utils/constants';

const StyledFlatList = styled(FlatList)

const CategoryScreen = () => {
    const [state, setState] = useState({
        categories: [],
        selectedCategory: {},
        subCategories: [],
        focusedIndex: null,
    });

    const focusedRef = useRef(null)

    useEffect(() => {
        initialFunction();
    }, []);

    const initialFunction = async () => {
        Promise.all([getAllCategories(), getAllSubCategories()])
            .then(() => { })
            .catch(error => {
                console.log('Error fetching initial data:', error.message || error);
            });
    }

    const getAllCategories = async () => {
        try {
            const response = await getAllCategoriesApi();
            let selectedCategory = {};
            if (response && response.data.length > 0) selectedCategory = response?.data[0]
            setState(prev => ({ ...prev, categories: response?.data || [], selectedCategory }));
        } catch (error) {
            console.log(error.message || error);
        }
    };

    const getAllSubCategories = async () => {
        try {
            const response = await getAllSubCategoriesApi();
            if (response?.data && response?.data.length > 0) {
                const groupedData = response?.data.reduce((result, item) => {
                    const group = result.find((g) => g.category === item.categoryName);

                    if (group) {
                        const isDuplicate = group.subCategory.some((sub) => sub.subCategoryId === item.subCategoryId);
                        if (!isDuplicate) {
                            group.subCategory.push(item);
                        }
                    } else {
                        result.push({ category: item.categoryName, subCategory: [item] });
                    }
                    return result;
                }, []);
                setState((prev) => ({ ...prev, subCategories: groupedData || [] }));
            }
        } catch (error) {
            console.log(error.message || error);
        }
    };

    const handleFocus = (data) => {
        let subCategoryName = state.subCategories.filter((item) => item.category === data.categoryName);
        let findSubCategory = 0;
        if (subCategoryName && subCategoryName.length > 0) {
            findSubCategory = state.subCategories.findIndex(item => item.category === subCategoryName[0].category);
        }
        setState(prev => ({ ...prev, focusedIndex: findSubCategory }))
        focusedRef.current.scrollToIndex({ index: findSubCategory, animated: true, viewPosition: 0.5, });
    };

    return (
        <View className="flex-1 bg-white">
            <View className='my-7 flex-row mx-7 justify-between'>
                <Text className='font-montserrat-sb text-base'>Top Categories</Text>
                <View>
                    <AntDesign name="search1" size={22} />
                </View>
            </View>
            <Divider />
            <View className='flex-1 flex-row w-full'>
                <View className='w-[25%] bg-slate-50'>
                    <StyledFlatList
                        data={state.categories}
                        renderItem={({ item, index }) => <RenderCategories item={item} index={index} state={state} setState={setState}
                            onFocusCategory={handleFocus}
                        />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View className='w-[75%] '>
                    <StyledFlatList
                        data={state.subCategories}
                        renderItem={({ item, index }) => <RenderSubCategories item={item} index={index} state={state}
                        />}
                        showsVerticalScrollIndicator={false}
                        ref={focusedRef}
                        extraData={state.focusedIndex}
                    />
                </View>
            </View>
        </View>
    )
}

const RenderCategories = ({ item, index, state, setState, onFocusCategory }) => {
    const isSelected = state.selectedCategory.categoryName === item.categoryName;
    const imageClass = isSelected
        ? 'h-12 w-12 rounded-full border border-red-600'
        : 'h-12 w-12 rounded-full';

    return (
        <Pressable onPress={() => {
            onFocusCategory(item)
            setState((prev) => ({ ...prev, selectedCategory: item }))
        }} key={index} className={`items-center py-4 ${isSelected ? `bg-white` : ``}`}>
            <Image
                source={{ uri: item.categoryImage }}
                className={imageClass}
            />
            <Text className={`text-center font-montserrat-rg ${isSelected ? `text-black` : `text-slate-400`}`}>{item.categoryName}</Text>
        </Pressable>
    )
}

const RenderSubCategories = ({ item, index, state }) => {
    return (
        <View key={index} className='p-2'>
            <Text className='font-montserrat-b mb-4'>{item.category}</Text>
            <View className='flex-row flex-wrap justify-start gap-2 '>
                {
                    item.subCategory &&
                        item.subCategory.length > 0 ?
                        item.subCategory.map((item, index) => {
                            return (
                                <TouchableOpacity className='w-[30%] items-center '>
                                    <Image
                                        source={{ uri: item.subcategoryImage ? item.subcategoryImage : IMAGES.noImage }}
                                        className='h-24 w-24 rounded-lg'
                                        resizeMode='contain'
                                    />
                                    <Text className='text-center mt-1 font-montserrat-rg'>{item.subCategoryName}</Text>
                                </TouchableOpacity>
                            )
                        }) : null
                }
            </View>
        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({})