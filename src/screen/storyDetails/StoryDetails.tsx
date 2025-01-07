/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../globals/components/appText/AppTest';
import {Screen} from '../../constants/ScreenName';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../../constants/Colors';
import userData from '../../helpers/userData';
import {Images} from '../../constants/Images';

const StoryDetails = ({navigation, route}) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const storyData = route?.params?.storyData;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await userData.getUserData();
      console.log('Refreshed userData on selectCategoryScreen', data);
      setCurrentLanguage(data.selectedLanguage);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={4000}
        direction="alternate"
        iterationCount={1}
        style={styles.storyHeadingContainer}>
        <View style={styles.subCategoryContainer}>
          <AppText
            semibold
            color={'#000'}
            text={
              currentLanguage === 'English'
                ? storyData.SubCategoryEng
                : storyData.SubCategoryHin
            }
            fontSize={23}
          />
        </View>
        <TouchableOpacity
          style={styles.musicIconContainer}
          onPress={() =>
            navigation.navigate(Screen.player, {
              storyData: storyData,
            })
          }>
          <Image source={Images.playAudioImage} style={styles.playMusicIcon} />
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View
        animation="fadeIn"
        duration={4000}
        delay={500}
        direction="alternate"
        iterationCount={1}
        style={styles.storyContainer}>
        <AppText
          regular
          color={'#000'}
          text={
            currentLanguage === 'English'
              ? storyData.StoryEnglish
              : storyData.StoryHindi
          }
          fontSize={18}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  subCategoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    padding: 15,
    marginVertical: 10,
    width: '100%',
  },
  storyHeadingContainer: {
    backgroundColor: Colors.continueButtonColor,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  musicIconContainer: {
    height: 40,
    width: 40,
    marginVertical: 20,
    marginRight: 10
  },
  playMusicIcon: {
    height: '100%',
    width: '100%',
  },
});

export default StoryDetails;
