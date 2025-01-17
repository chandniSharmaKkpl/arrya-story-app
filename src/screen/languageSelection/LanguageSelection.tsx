import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Screen} from '../../constants/ScreenName';
import {Fonts} from '../../constants/Fonts';
import {Colors} from '../../constants/Colors';
import {Images} from '../../constants/Images';
import * as Animatable from 'react-native-animatable';
import userData from '../../helpers/userData';
import { WordConstants } from '../../constants/WordConstants';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const LanguageSelectionScreen = ({navigation}: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleContinue = async (lang: any ) => {
    setSelectedLanguage(lang)
    const existingUserData = await userData.getUserData();
    if (existingUserData && Object.keys(existingUserData).length > 0) {
      const updatedUserData = {
        ...existingUserData,
        selectedLanguage: lang,
      };
      await userData.setUserData(updatedUserData);
    } else {
      await userData.setUserData({ selectedLanguage: lang });
    }
    navigation.navigate(Screen.ageSelection);
  };

  return (
    <LinearGradient colors={[Colors.ageSelectionScreenBg1, Colors.selectStoryLinearGradient]} style={styles.container}>
      <View style={styles.selectLanguageContainer}>
        <Text style={styles.title}>Select Your Language</Text>
      </View>
      <View style={styles.languageSelectionContainer}>
        <View style={styles.languageImageContainer}>
          <View style={styles.englishEmojiContainer}>
            <FastImage
              source={Images.namasteHindi}
              style={styles.EmojiEnglishImage}
              resizeMode="contain"
            />
            <FastImage
              source={Images.wavingHandGif}
              style={styles.englishEmojiHand}
              resizeMode="contain"
            />
          </View>
          <View style={styles.hindiEmojiContainer}>
            <FastImage
              source={Images.namasteHindi}
              style={styles.EmojiHindiImage}
              resizeMode="contain"
            />
            <FastImage
              source={Images.namasteHandGif}
              style={styles.hindiEmojiHand}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleContinue('English')}
            activeOpacity={1}>
            <View
              style={
                selectedLanguage === 'English'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedLanguage === 'English' && (
                <FastImage
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.languageLogoEngContainer}>
              <Text style={styles.languageEngText}>A</Text>
            </View>
            <Text style={styles.languageName}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleContinue('Hindi')}
            activeOpacity={1}>
            <View
              style={
                selectedLanguage === 'Hindi'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedLanguage === 'Hindi' && (
                <FastImage
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.languageLogoHinContainer}>
              <Text style={styles.languageHinText}>अ</Text>
            </View>
            <Text style={styles.languageName}>हिंदी</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate(Screen.selfRecording)}>
        <Text style={styles.continueText}>Self Recording 🎙️</Text>
      </TouchableOpacity> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectLanguageContainer: {
    marginTop: hp('10%'),
  },
  title: {
    fontFamily: Fonts.poppins_medium,
    fontSize: 26,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  option: {
    width: 152,
    height: 152,
    borderWidth: 2,
    borderColor: Colors.cardBorderColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  checkIcon: {
    height: 15,
    width: 15,
  },
  radioButtonContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.checkMarkBackgroundColor,
    bottom: 0,
    top: 5,
    right: 5,
  },
  languageSelectionContainer: {
    paddingBottom: hp('25%'),
    flex: 1,
    justifyContent: 'center',
  },
  languageImageContainer: {
    marginBottom: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  emptyRadioContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    bottom: 0,
    top: 5,
    right: 5,
  },
  languageLogoEngContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.englishLanguageColor,
  },
  languageLogoHinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.hindiLanguageColor,
  },
  radioButton: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 10,
  },
  languageEngText: {
    fontSize: 18,
    color: Colors.englishLanguageTextColor,
  },
  languageHinText: {
    fontSize: 18,
    color: Colors.hindiLanguageTextColor,
  },
  languageName: {
    marginTop: '3%',
    fontSize: 18,
    color: 'black',
  },
  continueButton: {
    justifyContent: 'center',
    marginBottom: hp('5%'),
    width: '90%',
    padding: hp('0.5%'),
    backgroundColor: Colors.continueButtonColor,
    borderRadius: 20,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.poppins_medium,
  },
  EmojiEnglishImage: {
    height: hp('13%'),
    width: wp('21%'),
  },
  EmojiHindiImage: {
    height: hp('12%'),
    width: wp('20%'),
  },
  englishEmojiHand: {
    bottom: 0,
    left: 5,
    position: 'absolute',
    height: hp('8%'),
    width: wp('13%'),
  },
  hindiEmojiHand: {
    bottom: 0,
    left: 18,
    position: 'absolute',
    height: hp('8%'),
    width: wp('13%'),
  },
  englishEmojiContainer: {
    left: 18,
    top: 5,
  },
  hindiEmojiContainer: {
    right: 25,
    top: 5,
  },
});

export default LanguageSelectionScreen;
