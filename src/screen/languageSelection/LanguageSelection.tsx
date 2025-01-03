import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Screen } from '../../constants/ScreenName';
import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';
import { Images } from '../../constants/Images';

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleContinue = () => {
    navigation.navigate(Screen.ageSelection, {selectedLanguage: selectedLanguage})
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectLanguageContainer}>
        <Text style={styles.title}>Select Your Language</Text>
      </View>
      <View style={styles.languageSelectionContainer}>
        <View style={styles.languageImageContainer}>
          <Image
            source={Images.englishEmojiIcon}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />

          <Image
            source={Images.hindiEmojiIcon}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => setSelectedLanguage('English')}
            activeOpacity={1}>
            <View
              style={
                selectedLanguage === 'English'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedLanguage === 'English' && (
                <Image
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
            onPress={() => setSelectedLanguage('Hindi')}
            activeOpacity={1}>
            <View
              style={
                selectedLanguage === 'Hindi'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedLanguage === 'Hindi' && (
                <Image
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
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
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
    paddingBottom: hp('15%'),
    flex: 1,
    justifyContent: 'center',
  },
  languageImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
});

export default LanguageSelectionScreen;
