import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styled} from 'nativewind';
import Animated, {Easing} from 'react-native-reanimated';

const StyledTextInput = styled(TextInput);

const AnimatedPlaceholderInput = ({placeholderText, ...props}) => {
  const [animationValues, setAnimationValues] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const animations = placeholderText
      ? placeholderText.split('').map(() => new Animated.Value(0))
      : [];
    setAnimationValues(animations);

    if (showPlaceholder && animations.length > 0) {
      Animated.stagger(
        100,
        animations.map((anim, index) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ),
      ).start();
    }
  }, [showPlaceholder, placeholderText]);

  const handleTextChange = text => {
    setInputText(text);
    setShowPlaceholder(text === '');
  };

  return (
    <View className="m-5">
      <StyledTextInput
        {...props}
        value={inputText}
        onChangeText={handleTextChange}
        placeholder=""
        className="border-gray-400 border rounded-full"
      />
      {showPlaceholder && (
        <View className="absolute top-5 left-5 flex-row">
          {placeholderText &&
            placeholderText.split('').map((char, index) => {
              const opacity = animationValues[index] || new Animated.Value(0);
              return (
                <Animated.Text key={index} style={{opacity}}>
                  {char}
                </Animated.Text>
              );
            })}
        </View>
      )}
    </View>
  );
};

export default AnimatedPlaceholderInput;

const styles = StyleSheet.create({});
