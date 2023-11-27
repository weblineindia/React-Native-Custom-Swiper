import React, {useRef, useState, useEffect} from 'react';
import {Animated, FlatList, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const ReactNativeCustomSwiper = ({
  data,
  renderPagination = null,
  showPagination = true,
  customRenderItem,
  loop = false,
  autoSlideInterval = 2000,
  autoSlideOnce = false,
}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  let interval;
  let autoSlideOnceInterval;

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems[0]) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollToIndex = (newIndex) => {
    setIndex(newIndex);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: newIndex});
    }
  };

  const startAutoSlide = () => {
    interval = setInterval(() => {
      const nextIndex = (index + 1) % data.length;
      scrollToIndex(nextIndex);
    }, autoSlideInterval);
  };

  const startAutoSlideOnce = () => {
    autoSlideOnceInterval = setInterval(() => {
      if (index === data.length - 1) {
        scrollToIndex(index);
      } else {
        scrollToIndex(index + 1);
      }
    }, autoSlideInterval);
  };

  useEffect(() => {
    if (loop) {
      startAutoSlide();
    }
    if (autoSlideOnce) {
      startAutoSlideOnce();
    }

    return () => {
      clearInterval(interval);
      clearInterval(autoSlideOnceInterval);
    };
  }, [index]);

  const onPanGestureEvent = Animated.event(
    [{nativeEvent: {translationX: scrollX}}],
    {useNativeDriver: false},
  );

  const onPanHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 50) {
        if (index > 0) {
          scrollToIndex(index - 1);
        }
      }
      if (nativeEvent.translationX < -50) {
        if (index < data.length - 1) {
          scrollToIndex(index + 1);
        }
      }
    }
  };

  const changeSlide = (newIndex) => {
    scrollToIndex(newIndex);
  };

  return (
    <PanGestureHandler
      onGestureEvent={onPanGestureEvent}
      onHandlerStateChange={onPanHandlerStateChange}>
      <View>
        <FlatList
          data={data}
          renderItem={({item, index: i}) => customRenderItem(item, i)}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ref={flatListRef}
        />
        {showPagination &&
          renderPagination &&
          renderPagination(index, data.length, changeSlide)}
      </View>
    </PanGestureHandler>
  );
};

export default ReactNativeCustomSwiper;
