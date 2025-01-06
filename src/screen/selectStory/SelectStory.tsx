import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
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
import Papa from 'papaparse';
import * as Animatable from 'react-native-animatable';

const AgeSelection = ({navigation}) => {
  const STORY_FILE =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQs9fHrUpJTDHoMHEKJSMaAZOqsW5miQhEMYunUoKj2K2MQOkzQUF_6cCln_PKi9Ap9THtrrUyMkMKd/pub?gid=1323515163&single=true&output=csv';

  const [storyArray, setStoryArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleContinue = () => {
    navigation.navigate(Screen.StoryDetails);
  };

  const fetchStory = async () => {
    setLoading(true);
    try {
      const response = await fetch(STORY_FILE);
      const csvData = await response.text();
      Papa.parse(csvData, {
        complete: result => {
          setStoryArray(result.data);
        },
        header: true,
      });
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  console.log('selectedSubcategory', selectedSubcategory)

  const renderItem = ({item}) => {
    console.log('item', item);
    return (
      <View style={styles.ageSelectionMenu}>
        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          direction="alternate"
          iterationCount={1}
          style={{justifyContent: 'center', alignItems: 'center'}}
          >
          <TouchableOpacity
            style={styles.ageOptionContainer}
            onPress={() => setSelectedSubcategory(item.SubCategory)}
            activeOpacity={1}>
              <Text style={styles.subCategoryText}>{item.SubCategory}</Text>
            <View
              style={
                selectedSubcategory === item.SubCategory
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {selectedSubcategory === item.SubCategory && (
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
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectLanguageContainer}>
        <Text style={styles.title}>Select Story</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <FlatList
            data={storyArray.slice(0,3)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{justifyContent: 'center'}}
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
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
  },
  ageOptionContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('7%'),
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
  subCategoryText: {
    fontFamily: Fonts.poppins_medium,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default AgeSelection;
