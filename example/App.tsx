import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IntroSlider from 'react-native-custom-swiper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const data = [
  {
    id: 1,
    imageLink: require('./src/images/background.jpg'),
  },
  {
    id: 2,
    imageLink: require('./src/images/cat.jpg'),
  },
  {
    id: 3,
    imageLink: require('./src/images/element.jpg'),
  },
  {
    id: 4,
    imageLink: require('./src/images/fox.jpeg'),
  },
  {
    id: 5,
    imageLink: require('./src/images/lion.jpg'),
  },
];

const App = () => {
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
            style={styles.skipButtonViewStyle}
            onPress={() => {
              console.log('Skip swiper screens to end.');
            }}>
            <Text style={styles.skipTextStyle}>Skip </Text>
            <Image
              source={require('./src/images/arrow.png')}
              style={styles.skipImageStyle}
            />
          </TouchableOpacity>
        )}
        <View style={styles.paginationViewStyle}>
          {data.length > 1 &&
            data?.map((_: any, i: React.Key | null | undefined) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                style={[
                  styles.paginationStyle,
                  {
                    backgroundColor:
                      currentIndex === i ? '#FFFFFF' : '#00000000',
                  },
                ]}
                onPress={() => changeSlide(i)}
              />
            ))}
        </View>
        {(currentIndex + 1 === total || total === 1) && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.nextButtonStyle}
            onPress={() => {
              console.log(
                'At the End of the swiper screens navigate to Next Screen.',
              );
            }}>
            <Text style={styles.nextButtonFontStyle}>
              Navigate To Next Screen
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const _renderItem = (item: any, index: number) => (
    <View style={styles.main} key={index}>
      <Image
        source={item.imageLink}
        style={{
          height: height,
          width: width,
        }}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.main}>
      <View style={styles.mainContainer}>
        <IntroSlider
          data={data} // Pass the array of data that you want to make slide.
          renderPagination={_renderPagination} // Required for pagination showing like index dot or if you want to show any other component like button as mention in the Example.
          customRenderItem={_renderItem} // Provide the RenderItem Function for showing the slider screen which user want to show.
          autoSlideInterval={2000} // Add the Time for the Delay slide automaticallly.
          loop={true} // Default is False Set it to True if you want to make slider in loop.
          autoSlideOnce={false} // Default is False to make if manual slide by user. Set it to True if you want to make slider in auto slide for one time only.
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 3,
  },
  nextButtonStyle: {
    backgroundColor: '#E9D4B0',
    position: 'absolute',
    bottom: 50,
    width: '85%',
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonFontStyle: {
    color: '#000000',
    fontSize: 16,
  },
  paginationStyle: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    transform: [{rotate: '45deg'}],
    height: 9,
    width: 9,
    marginHorizontal: 5,
  },
  paginationViewStyle: {
    bottom: 130,
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
  },
  skipButtonViewStyle: {
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
  },
  skipImageStyle: {
    height: 18,
    width: 18,
  },
});

export default App;
