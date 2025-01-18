/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Dimensions} from 'react-native';
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
import {Fonts} from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const StoryDetails = ({navigation, route}: any) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const storyData = route?.params?.storyData;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await userData.getUserData();
      setCurrentLanguage(data.selectedLanguage);
    });
    return unsubscribe;
  }, []);

  const storyText = currentLanguage === 'English' 
    ? storyData.StoryEnglish 
    : storyData.StoryHindi;

  const storyWords = storyText.split(/\s+/);
  console.log('storyWords', storyWords)

  const renderItem = ({item, index} : any) => {
    console.log('item', item)
    return (
      <Animatable.Text
        key={index}
        animation="fadeIn"
        duration={500}
        delay={index === 0 ? 200 : index * 200}
        style={styles.storyText}>
        {item}
        {'  '}
      </Animatable.Text>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.ageSelectionScreenBg1, Colors.selectStoryLinearGradient]}
      style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={1000}
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
          <FastImage
            source={Images.playAudioImage}
            style={styles.playMusicIcon}
          />
        </TouchableOpacity>
      </Animatable.View>
      <FlatList
        data={storyWords}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.storyContainer}
        numColumns={7}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('6%'),
  },
  subCategoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginTop: hp('5%'),
    width: '80%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // backgroundColor: 'red'
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
    marginRight: 10,
  },
  playMusicIcon: {
    height: '100%',
    width: '100%',
  },
  storyText: {
    fontFamily: Fonts.katibeh_regular,
    color: '#000',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center'
    // flexWrap: 'wrap',
  },
});

export default StoryDetails;
