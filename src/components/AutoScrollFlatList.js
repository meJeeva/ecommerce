import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {IMAGES} from '../utils/constants';
import {styled} from 'nativewind';

const StyledImage = styled(Image);
const {width} = Dimensions.get('window');
const AutoScrollFlatList = ({data, activeIndex, setState}) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState(prevState => {
        const nextIndex =
          prevState.activeIndex === prevState.productBanner.length - 1
            ? 0
            : prevState.activeIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return {...prevState, activeIndex: nextIndex};
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleScroll = useCallback(
    event => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(offsetX / width);
      setState(prev => ({...prev, activeIndex: currentIndex}));
    },
    [activeIndex],
  );

  return (
    <View className="my-5">
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <View key={index}>
            <TouchableOpacity className="">
              <StyledImage
                source={{
                  uri: item.image ? item.image : IMAGES.noImage,
                }}
                className="w-screen h-64 resize-none"
              />
            </TouchableOpacity>
          </View>
        )}
        horizontal
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={flatListRef}
      />
      <ScrollView horizontal className="my-2 mx-auto">
        {data.map((item, index) => (
          <View
            className={`h-2 w-2 rounded-full mx-1 ${
              activeIndex === index ? `bg-black` : `bg-gray-400`
            }`}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AutoScrollFlatList;

const styles = StyleSheet.create({});
