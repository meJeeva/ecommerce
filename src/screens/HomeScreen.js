import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'nativewind';
import { COLORS, IMAGES } from '../utils/constants';
import { getAllCategoriesApi, getAllLanguagesApi, getAllOfferBannerApi } from '../api/api';
import AutoScrollFlatList from '../components/AutoScrollFlatList';
import { RadioButton } from 'react-native-paper';

const StyledTextInput = styled(TextInput);
const StyledFlatList = styled(FlatList);
const StyledImage = styled(Image);

const HomeScreen = () => {
  const [state, setState] = useState({
    search: '',
    categories: [],
    offerBanner: [],
    productBanner: [],
    activeIndex: 0,
    languages: [],
    selectedLanguage: {}
  });

  useEffect(() => {
    initialFunctions();
  }, []);

  const initialFunctions = () => {
    Promise.all([getAllCategories(), getAllOffers(), getAllProductBanner(), getAllLanguages()])
      .then(() => { })
      .catch(error => {
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
      setState(prev => ({ ...prev, offerBanner: response?.data || [] }));
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const getAllProductBanner = async () => {
    try {
      let type = 'product';
      const response = await getAllOfferBannerApi(type);
      setState(prev => ({ ...prev, productBanner: response?.data || [] }));
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const getAllLanguages = async () => {
    try {
      const response = await getAllLanguagesApi();
      setState(prev => ({ ...prev, languages: response?.data || [] }));
    } catch (error) {
      console.log(error.message || error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between mx-6 my-5 mb-8">
        <Text className="font-montserrat-m text-2xl">Techdeal</Text>
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
      <ScrollView className='flex-1'>
        {/* categories list */}
        <View className="">
          <StyledFlatList
            data={state.categories}
            keyExtractor={item => item.categoryId.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                className="items-center gap-3 p-1 pb-3 w-24 mr-3">
                <StyledImage
                  source={{
                    uri: item.categoryImage ? item.categoryImage : IMAGES.noImage,
                  }}
                  className="w-16 h-16 rounded-full"
                />
                <Text className=" font-montserrat-rg text-xs">
                  {item.categoryName}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            contentInset={{ top: 20 }}
            showsVerticalScrollIndicator={false}
            className="mt-5 "
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* offer banner */}
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
        {/* product banner */}
        {
          state.productBanner &&
            state.productBanner.length > 0 ? (
            <AutoScrollFlatList
              data={state.productBanner}
              activeIndex={state.activeIndex}
              setState={setState}
            />
          ) : null
        }
        <View>
          <Text className="ml-4 text-base font-montserrat-b">Choose Language</Text>
          <View>
            <StyledFlatList
              data={state.languages}
              renderItem={({ item, index }) => (
                <View key={index}>
                  <View className="bg-white border border-slate-200 rounded-xl shadow-lg px-3 mx-2 py-1 flex-row items-center ">
                    <Text className={`${index % 2 === 0 ? `bg-orange-300` : `bg-purple-300`} px-2 mr-3 py-1 rounded-md`}>{item.name ? item.name[0] : item.name}</Text>
                    <Text className='text-center mr-2'>{item.name}</Text>
                    <RadioButton
                      value={state.selectedLanguage}
                      status={state.selectedLanguage.name === item.name ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setState((prev) => ({ ...prev, selectedLanguage: item }))
                      }}
                      color={COLORS.blue}
                    />
                  </View>
                </View>
              )}
              horizontal
              className='mt-3 ml-3'
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
