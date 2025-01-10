import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Images} from '../../constants/Images';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../../constants/ScreenName';
import * as Animatable from 'react-native-animatable';

const SplashScreen = () => {
  const navigation = useNavigation();

  const endAnimationAndNavigate = () => {
    // Use reset to clear the navigation stack and prevent going back to splash screen
    setTimeout(() => {
      navigation.reset({
        index: 0, // Make the new screen the root
        routes: [{ name: Screen.languageSelection }], // Navigate to the language selection screen
      });
    }, 1000); // Delay after animation
  };

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
