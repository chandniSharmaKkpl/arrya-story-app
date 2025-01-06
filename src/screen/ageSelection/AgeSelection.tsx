import React, {useState} from 'react';
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

const AgeSelection = ({navigation}) => {

  const [selectedAge, setSelectedAge] = useState('0to5');

  const handleContinue = () => {
    navigation.navigate(Screen.selectCategory);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectLanguageContainer}>
        <Text style={styles.title}>Select Age Group</Text>
      </View>
      <View style={styles.ageSelectionMenu}>
        <Animatable.View animation="bounceIn" duration={1000} direction="alternate" iterationCount={1}>
        <TouchableOpacity
          style={styles.ageOptionContainer}
          onPress={() => setSelectedAge('0to5')}
          activeOpacity={1}>
          <View>
            <Text>0-5 yrs</Text>
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
        <Animatable.View animation="bounceIn" duration={1000} direction="alternate" iterationCount={1}>
        <TouchableOpacity
          style={styles.ageOptionContainer}
          onPress={() => setSelectedAge('5to10')}
          activeOpacity={1}>
          <View>
            <Text>5-10 yrs</Text>
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
        <Animatable.View animation="bounceIn" duration={1000} direction="alternate" iterationCount={1}>
        <TouchableOpacity
          style={styles.ageOptionContainer}
          onPress={() => setSelectedAge('10to15')}
          activeOpacity={1}>
          <View>
            <Text>10-15 yrs</Text>
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
