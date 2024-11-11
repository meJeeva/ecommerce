import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styled} from 'nativewind';
import {COLORS} from '../utils/constants';
import {getProductCategory} from '../api/api';

const StyledTextInput = styled(TextInput);
const StyledFlatList = styled(FlatList);

const HomeScreen = () => {
  const [state, setState] = useState({
    search: '',
    categories: [],
  });

  useEffect(() => {
    initialFunctions();
  }, []);

  const initialFunctions = () => {
    Promise.all([getAllCategories]).then(() => {
      console.log('fetched all initial data');
    });
  };

  const getAllCategories = async () => {
    try {
      const response = await getProductCategory();
      setState(prev => ({...prev, categories: response || []}));
      console.log(response);
    } catch (error) {
      console.log(error.message || error);
    }
  };

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

      <View className="mb-6 mx-6 flex-row items-center justify-between space-x-5">
        <View className="flex-row items-center gap-3 border-primary  border-2 rounded-full  w-10/12 pb-3">
          <View className="px-2">
            <AntDesign name="search1" size={22} color={COLORS.blue} />
          </View>
          <View className="flex-1">
            <StyledTextInput
              value={state.search}
              onChangeText={text => setState(prev => ({...prev, search: text}))}
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
      <View className='flex-1'>
        <StyledFlatList
          data={state.categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View className="flex-row items-center gap-3 border-gray-400 border rounded-full p-1 pb-3">
              <View className="h-5 px-3">
                <AntDesign name="plus" size={22} />
              </View>
              <Text>{item}</Text>
            </View>
          )}
          contentContainerStyle={{paddingHorizontal: 20}}
          contentInset={{top: 20}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
