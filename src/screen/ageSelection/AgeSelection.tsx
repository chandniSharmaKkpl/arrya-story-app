import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Screen} from '../../constants/ScreenName';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../../constants/Fonts';
import {Colors} from '../../constants/Colors';
import {Images} from '../../constants/Images';
import * as Animatable from 'react-native-animatable';
import userData from '../../helpers/userData';
import {WordConstants} from '../../constants/WordConstants';

const AgeSelection = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState('0to5');
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const handleContinue = async () => {
    const existingUserData = await userData.getUserData();
    if (existingUserData && Object.keys(existingUserData).length > 0) {
      console.log('User data exists');
      console.log('getUserData', existingUserData);
      const updatedUserData = {
        ...existingUserData, // Keep any other existing fields
        selectedAge: selectedAge, // Update the selected language
      };
      console.log('updatedUserData', updatedUserData);
      await userData.setUserData(updatedUserData);
    } else {
      console.log('from the agescreen');
      // await userData.setUserData({ selectedLanguage: selectedLanguage });
    }
    navigation.navigate(Screen.selectCategory);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await userData.getUserData();
      console.log('Refreshed userData on screen focus:', data);
      setCurrentLanguage(data.selectedLanguage);
    });
    return unsubscribe; // Clean up the listener on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        delay={500}
        direction="alternate"
        iterationCount={1}
        style={styles.selectLanguageContainer}>
        <Text style={styles.title}>
          {currentLanguage === 'English'
            ? WordConstants.ageSelection[0]
            : WordConstants.ageSelection[1]}
        </Text>
      </Animatable.View>
      <View style={styles.ageSelectionMenu}>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          delay={1000}
          direction="alternate"
          iterationCount={1}>
          <TouchableOpacity
            style={styles.ageOptionContainer}
            onPress={() => setSelectedAge('0to5')}
            activeOpacity={1}>
            <View>
              <Text>
                {currentLanguage === 'English'
                  ? WordConstants.zeroToFive[0]
                  : WordConstants.zeroToFive[1]}
              </Text>
            </View>
            <View
              style={
                selectedAge === '0to5'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedAge === '0to5' && (
                <Image
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          delay={1500}
          direction="alternate"
          iterationCount={1}>
          <TouchableOpacity
            style={styles.ageOptionContainer}
            onPress={() => setSelectedAge('5to10')}
            activeOpacity={1}>
            <View>
              <Text>
                {currentLanguage === 'English'
                  ? WordConstants.fiveToTen[0]
                  : WordConstants.fiveToTen[1]}
              </Text>
            </View>
            <View
              style={
                selectedAge === '5to10'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedAge === '5to10' && (
                <Image
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          delay={2000}
          direction="alternate"
          iterationCount={1}>
          <TouchableOpacity
            style={styles.ageOptionContainer}
            onPress={() => setSelectedAge('10to15')}
            activeOpacity={1}>
            <View>
              <Text>
                {currentLanguage === 'English'
                  ? WordConstants.tenToFifteen[0]
                  : WordConstants.tenToFifteen[1]}
              </Text>
            </View>
            <View
              style={
                selectedAge === '10to15'
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedAge === '10to15' && (
                <Image
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>
          {currentLanguage === 'English'
            ? WordConstants.continueButton[0]
            : WordConstants.continueButton[1]}
        </Text>
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
  ageSelectionMenu: {
    flex: 1,
    marginTop: hp('5%'),
  },
  ageOptionContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('6%'),
    borderWidth: 2,
    borderColor: Colors.cardBorderColor,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  radioButtonContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.continueButtonColor,
  },
  emptyRadioContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    height: 15,
    width: 15,
  },
});

export default AgeSelection;
