import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../../constants/Images';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../../constants/ScreenName';
import * as Animatable from 'react-native-animatable';

const SplashScreen = () => {
  const navigation = useNavigation();

  //   useEffect(() => {
  //     console.log('i am calling')
  //     setTimeout(() => {
  //         console.log('i am calling after 2')

  //     }, 2000);
  //   }, []);

  const endAnimationAndNavigate = () => {
    navigation.navigate(Screen.languageSelection);
  };

  console.log('here');

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="zoomInUp"
        duration={1500}
        easing="linear"
        source={Images.splashScreenLogo}
        onAnimationEnd={endAnimationAndNavigate}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
