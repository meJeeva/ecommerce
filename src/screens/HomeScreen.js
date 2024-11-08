import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'nativewind';
import AnimatedPlaceholderInput from '../components/AnimatedPlaceholderInput';

const StyledTextInput = styled(TextInput);

const HomeScreen = () => {
    const [state, setState] = useState({
        search: ""
    })

    return (
        <View className='flex-1 bg-white'>
            <View className='flex-row justify-between mx-6 my-5 mb-8'>
                <Text>Techdeal</Text>
                <View className='flex-row gap-5'>
                    <TouchableOpacity>
                        <FontAwesome name="language" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View className="m-6">
                <View className="flex-row items-center gap-3 border-gray-400 border rounded-full p-1 pb-3">
                    <View className="h-5 px-3">
                        <AntDesign name="search1" size={22} />
                    </View>
                    <View className="flex-1">
                        <StyledTextInput
                            value={state.search}
                            onChangeText={(text) => setState((prev) => ({ ...prev, search: text }))}
                            placeholder="Search for kitchen Item"
                            placeholderTextColor="grey"
                            className="py-1"
                        />
                    </View>
                </View>
            </View> */}
            <AnimatedPlaceholderInput placeholderText="Search for kitchen Item" />

        </View>
    )
}

export default HomeScreen