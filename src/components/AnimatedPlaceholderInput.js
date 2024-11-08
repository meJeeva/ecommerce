import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind';
import Animated from 'react-native-reanimated';

const StyledTextInput = styled(TextInput);

const AnimatedPlaceholderInput = ({ placeholderText, ...props }) => {
    const [animationValues, setAnimationValues] = useState([]);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        const animations = placeholderText.split('').map(() => new Animated.Value(0));
        setAnimationValues(animations);

        if (showPlaceholder) {
            Animated.stagger(100, animations.map((anim, index) =>
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 500,
                    delay: index * 100,
                    useNativeDriver: true,
                })
            )).start();
        }

    }, [showPlaceholder, placeholderText]);

    const handleTextChange = (text) => {
        setInputText(text);
        if (text !== '') {
            setShowPlaceholder(false);
        }
    }

    return (
        <View className='m-5'>
            <StyledTextInput
                {...props}
                value={inputText}
                onChangeText={handleTextChange}
                placeholder=''
                className='border-gray-400 border rounded-full'
            />
            {
                showPlaceholder && (
                    <View className="absolute top-5 lef-5">
                        {
                            placeholderText?.split('').map((item, index) => {
                                const opacity = animationValues[index] || new Animated.Value(0);

                                return (
                                    <Animated.Text key={index} style={{ opacity }}>
                                        {item}
                                    </Animated.Text>
                                )
                            })
                        }
                    </View>
                )
            }
        </View>
    )
}

export default AnimatedPlaceholderInput

const styles = StyleSheet.create({})