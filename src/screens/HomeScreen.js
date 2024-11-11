import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'nativewind';
import { IMAGES } from '../utils/constants';
import { getAllCategoriesApi, getAllOfferBannerApi } from '../api/api';

const StyledTextInput = styled(TextInput);
const StyledFlatList = styled(FlatList);
const StyledImage = styled(Image);

const HomeScreen = () => {
  const [state, setState] = useState({
    search: '',
    categories: [],
  });

  useEffect(() => {
    initialFunctions();
  }, []);

  const initialFunctions = () => {
    Promise.all([getAllCategories(),
    getAllOffers()
    ])
      .then(() => {
      })
      .catch((error) => {
        console.log('Error fetching initial data:', error.message || error);
      });
  };

  const getAllCategories = async () => {
    try {
      const response = await getAllCategoriesApi();
      setState(prev => ({ ...prev, categories: response?.data || [] }));
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const getAllOffers = async () => {
    try {
      let type = 'offer';
      const response = await getAllOfferBannerApi(type);
    } catch (error) {
      console.log(error.message || error);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between mx-6 my-5 mb-8">
        <Text className="font-montserrat-m">Techdeal</Text>
        <View className="flex-row gap-5">
          <TouchableOpacity>
            <FontAwesome name="language" size={22} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="hearto" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <View className=" mx-6 flex-row items-center justify-between space-x-5">
        <View className="flex-row items-center gap-3 border-primary  border-2 rounded-full  w-10/12 pb-3">
          <View className="px-2">
            <AntDesign name="search1" size={22} />
          </View>
          <View className="flex-1">
            <StyledTextInput
              value={state.search}
              onChangeText={text => setState(prev => ({ ...prev, search: text }))}
              placeholder="Search for kitchen Item"
              placeholderTextColor="grey"
              className="py-1"
            />
          </View>
        </View>
        <TouchableOpacity className=" border-primary  border-2 rounded-full flex  w-11 h-11 py-3 items-center justify-center mb-3">
          <FontAwesome name="microphone" size={15} />
        </TouchableOpacity>
      </View>

      {/* categories list */}
      <View className="">
        <StyledFlatList
          data={state.categories}
          keyExtractor={item => item.categoryId.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} className="items-center gap-3 p-1 pb-3 w-24 mr-5">
              <StyledImage
                source={{
                  uri: item.categoryImage ? item.categoryImage : IMAGES.noImage
                }}
                className='w-20 h-20 rounded-full'
              />
              <Text className=" font-montserrat-rg text-xs">{item.categoryName}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          contentInset={{ top: 20 }}
          showsVerticalScrollIndicator={false}
          className='mt-5 '
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
