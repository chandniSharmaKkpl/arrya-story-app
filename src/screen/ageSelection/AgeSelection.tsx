import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  Platform,
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
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const AgeSelection = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState('0to5');
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const handleContinue = async () => {
    const existingUserData = await userData.getUserData();
    if (existingUserData && Object.keys(existingUserData).length > 0) {
      const updatedUserData = {
        ...existingUserData,
        selectedAge: selectedAge,
      };
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
      setCurrentLanguage(data.selectedLanguage);
    });
    return unsubscribe;
  }, []);

  return (
    <LinearGradient
      colors={[Colors.ageSelectionScreenBg1, Colors.ageSelectionScreenBg2]}
      style={styles.container}>
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
          <View style={styles.ageOptionContainer1}>
            <View style={styles.toodlerImageContainer}>
              <FastImage
                source={Images.toodlers1}
                style={styles.toodlerImage}
              />
            </View>
            <View style={styles.toodlerTextContainer}>
              <View
                style={{
                  marginTop:
                    currentLanguage === 'English' && Platform.OS === 'ios'
                      ? hp('2.5%')
                      : 0,
                }}>
                <Text style={styles.toodlerText}>
                  {currentLanguage === 'English'
                    ? WordConstants.ageWord1[0]
                    : WordConstants.ageWord1[1]}
                </Text>
              </View>
              <View style={styles.ageButtonContainer}>
                <TouchableOpacity
                  style={
                    selectedAge === '0to5'
                      ? styles.ageSelectionButton
                      : styles.emptySelectionButton
                  }
                  onPress={() => setSelectedAge('0to5')}
                  activeOpacity={1}>
                  <Text
                    style={{
                      color:
                        selectedAge === '0to5'
                          ? Colors.ageSelectionScreenBg1
                          : 'black',
                    }}>
                    {currentLanguage === 'English'
                      ? WordConstants.zeroToFive[0]
                      : WordConstants.zeroToFive[1]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View>
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
                <FastImage
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View> */}
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          delay={1500}
          direction="alternate"
          iterationCount={1}>
          <View style={styles.ageOptionContainer2}>
            <View style={styles.toodlerImageContainer}>
              <FastImage
                source={Images.toodlers2}
                style={styles.toodlerImage}
              />
            </View>
            <View style={styles.toodlerTextContainer}>
              <View
                style={{
                  marginTop:
                    currentLanguage === 'English' && Platform.OS === 'ios'
                      ? hp('2.5%')
                      : 0,
                }}>
                <Text style={styles.toodlerText}>
                  {currentLanguage === 'English'
                    ? WordConstants.ageWord2[0]
                    : WordConstants.ageWord2[1]}
                </Text>
              </View>
              <View
                style={styles.ageButtonContainer}>
                <TouchableOpacity
                  style={
                    selectedAge === '5to10'
                      ? styles.ageSelectionButton
                      : styles.emptySelectionButton
                  }
                  onPress={() => setSelectedAge('5to10')}
                  activeOpacity={1}>
                  <Text
                    style={{
                      color:
                        selectedAge === '5to10'
                          ? Colors.ageSelectionScreenBg1
                          : 'black',
                    }}>
                    {currentLanguage === 'English'
                      ? WordConstants.fiveToTen[0]
                      : WordConstants.fiveToTen[1]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
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
                <FastImage
                  source={Images.checkIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity> */}
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          delay={2000}
          direction="alternate"
          iterationCount={1}>
          <View style={styles.ageOptionContainer3}>
            <View style={styles.toodlerImageContainer}>
              <FastImage
                source={Images.toodlers3}
                style={styles.toodlerImage}
              />
            </View>
            <View style={styles.toodlerTextContainer}>
              <View
                style={{
                  marginTop:
                    currentLanguage === 'English' && Platform.OS === 'ios'
                      ? hp('2.5%')
                      : 0,
                }}>
                <Text style={styles.toodlerText}>
                  {currentLanguage === 'English'
                    ? WordConstants.ageWord3[0]
                    : WordConstants.ageWord3[1]}
                </Text>
              </View>
              <View
                style={styles.ageButtonContainer}>
                <TouchableOpacity
                  style={
                    selectedAge === '10to15'
                      ? styles.ageSelectionButton
                      : styles.emptySelectionButton
                  }
                  onPress={() => setSelectedAge('10to15')}
                  activeOpacity={1}>
                  <Text
                    style={{
                      color:
                        selectedAge === '10to15'
                          ? Colors.ageSelectionScreenBg1
                          : 'black',
                    }}>
                    {currentLanguage === 'English'
                      ? WordConstants.tenToFifteen[0]
                      : WordConstants.tenToFifteen[1]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>
          {currentLanguage === 'English'
            ? WordConstants.continueButton[0]
            : WordConstants.continueButton[1]}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectLanguageContainer: {
    // backgroundColor:'green',
    marginTop: Platform.OS === 'android' ? hp('3%') : hp('6%'),
  },
  title: {
    fontFamily: Fonts.poppins_medium,
    fontSize: 26,
    // marginBottom: 20,
  },
  continueButton: {
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? hp('3%') : hp('6%'),
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
    // marginTop: hp('5%'),
  },
  ageOptionContainer1: {
    // backgroundColor: 'yellow',
    backgroundColor: Colors.ageCardColor1,
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('20%'),
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  ageOptionContainer2: {
    // backgroundColor: 'yellow',
    backgroundColor: Colors.ageCardColor2,
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('20%'),
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  ageOptionContainer3: {
    // backgroundColor: 'yellow',
    backgroundColor: Colors.ageCardColor3,
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('20%'),
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 20,
    alignItems: 'flex-start',
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
  toodlerImageContainer: {
    flex: 1,
    // backgroundColor: 'green',
    marginTop: hp('1.9%'),
  },
  toodlerImage: {
    height: hp('16%'),
    width: wp('32%'),
  },
  toodlerTextContainer: {
    flex: 1.4,
    // backgroundColor: 'yellow',
    marginTop: hp('1.5%'),
  },
  toodlerText: {
    fontFamily: Fonts.katibeh_regular,
    fontSize: Platform.OS === 'android' ? hp('1.7%') : hp('2.3%'),
    textAlign: 'center',
  },
  ageSelectionButton: {
    borderColor: Colors.continueButtonColor,
    borderWidth: 1,
    backgroundColor: Colors.continueButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    marginHorizontal: hp('1.5%'),
    borderRadius: 25,
    // marginTop: hp('1.2%'),
  },
  emptySelectionButton: {
    borderColor: Colors.continueButtonColor,
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    marginHorizontal: hp('1.5%'),
    borderRadius: 25,
    // marginTop: hp('1.2%'),
  },
  ageButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
});

export default AgeSelection;
