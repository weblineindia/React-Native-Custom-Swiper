# react-native-custom-swiper

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
  - [Basic](#basic)
- [Examples](#examples)
- [Development](#development)

### Installation

```bash
$ npm install react-native-custom-swiper --save
```

```bash
$ yarn add react-native-custom-swiper
```

### Depedency Library

```bash
$ npm install react-native-gesture-handler --save
```

```bash
$ yarn add react-native-gesture-handler
```
Need to install depedency Library of `react-native-gesture-handler` to work with the Slider Component and make slider perform smoothly.

### Basic Usage

```jsx
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeCustomSwiper from 'react-native-custom-swiper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const IntroScreen = () => {
  const {sliderData, setSliderData} = useState(['Your Data']);

  const _renderItem = (item: any, index: number) => (
   // As per Your requirment.
  );

  const _renderPagination = (
    currentIndex: number,
    total: number,
    changeSlide: (i: any) => {},
  ) => {
    return (
      <View>
        {currentIndex + 1 < total && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              backgroundColor: '#000000',
              width: 80,
              height: 40,
              bottom: Dimensions.get('window').height - 100,
              right: 0,
              flex: 1,
              zIndex: 999,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {'Skip swiper screens to end.'}}>
            <Text style={styles.skipTextStyle}>Skip Button</Text>
            <ImageView source={images.Arrow} style={styles.skipImageStyle} />
          </TouchableOpacity>
        )}
        <View style={{
            bottom: 130,
            flexDirection: 'row',
            position: 'absolute',
            alignSelf: 'center',
          }}>
          {sliderData.length > 1 &&
            sliderData?.map(
              (_: any, i: React.Key | null | undefined) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: '#FFFFFF',
                      transform: [{rotate: '45deg'}],
                      height: 9,
                      width: 9,
                      marginHorizontal: 5,
                    },
                    {
                      backgroundColor:
                        currentIndex === i ? '#FFFFFF' : '#00000000',
                    },
                  ]}
                  onPress={() => changeSlide(i)}
                />
              ),
            )}
        </View>
        {(currentIndex + 1 === total || total === 1) && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#E9D4B0',
              position: 'absolute',
              bottom: 50,
              width: '85%',
              height: 46,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {'End swiper screens navigate to Next Screen.'}}>
            <Text style={{
              color: '#000000',
              fontSize: 16,
            }}>
              Navigate To Next Screen
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
     <GestureHandlerRootView style={{flex: 1}}>
        <IntroSlider
          data={sliderData}
          renderPagination={_renderPagination}
          customRenderItem={_renderItem}
          autoSlideInterval={3000}
          autoSlideOnce={true}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default IntroScreen;
```

### Properties

#### Basic

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| data                   |   required   |  `array`  | Data to use in renderItem and show swiper screen. |
| showPagination         |     `true`   |  `bool`   | Show pagination. |
| renderPagination       |     `null`   |  `node`   | Customize your Pagination as per need. |
| customRenderItem       |   required   |  `func`   | Add the custom `FlatListProps<T>['renderItem']` to show the swiper screen as required. |
| loop                   |     `false`  |  `bool`   | Set to `true` to enable continuous loop mode. |
| autoSlideOnce          |     `false`  |  `bool`   | Set to `true` to enable auto swiper for once. |
| autoSlideInterval      |     `2000`   |  `func`   | Add the time in `mili second` to enable auto swiper as per mention time or default for every `2 second`. |


### Examples

```bash
$ cd examples
$ npm i
$ react-native run-ios
```

> Quick start with [examples](https://github.com/leecade/react-native-swiper/tree/master/examples/).

### Development

```bash
$ cd examples
$ yarn
$ yarn start
$ react-native run-ios
```

Then launch simulator to preview. Note that you just need to edit the source file `src/index.js`, the change will auto sync to examples.

