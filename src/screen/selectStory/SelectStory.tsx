import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
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
import {StoryFiles} from '../../constants/StoryFile';
import userData from '../../helpers/userData';
import {WordConstants} from '../../constants/WordConstants';
import FastImage from 'react-native-fast-image';

const SelectStory = ({navigation, route}) => {
  const [storyArray, setStoryArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const subCategories = route?.params?.subCategory;

  const handleContinue = () => {
    navigation.navigate(Screen.storyDetails, {
      storyData: selectedSubcategory,
    });
  };

  const getCategoryName = (categoryName: any) => {
    switch (categoryName) {
      case 'FAIRY TALES':
        return StoryFiles.FAIRYTALES;
      case 'ANIMALS':
        return StoryFiles.ANIMALS;
      case 'SUPERHERO':
        return StoryFiles.SUPERHERO;
      case 'SCIENCE':
        return StoryFiles.SCIENCE_ADVENTURE;
      case 'GEOGRAPHY':
        return StoryFiles.GEOGRAPHY;
      case 'HISTORY':
        return StoryFiles.HISTORY;
      default:
        return null;
    }
  };

  const fetchStory = async () => {
    const getCategory = getCategoryName(subCategories.nameEng);
    setLoading(true);
    try {
      const response = await fetch(getCategory);
      const csvData = await response.text();
      Papa.parse(csvData, {
        complete: (result: any) => {
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
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await userData.getUserData();
      setCurrentLanguage(data.selectedLanguage);
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.ageSelectionMenu}>
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          delay={index === 0 ? 500 : index * 500}
          direction="alternate"
          iterationCount={1}
          style={styles.storyItemContainer}>
          <TouchableOpacity
            style={styles.ageOptionContainer}
            onPress={() => setSelectedSubcategory(item)}
            activeOpacity={1}>
            <Text style={styles.subCategoryText}>
              {currentLanguage === 'English'
                ? item.SubCategoryEng
                : item.SubCategoryHin}
            </Text>
            <View
              style={
                selectedSubcategory?.SubCategoryEng === item.SubCategoryEng ||
                selectedSubcategory?.SubCategoryHin === item.SubCategoryHin
                  ? styles.radioButtonContainer
                  : styles.emptyRadioContainer
              }>
              {(selectedSubcategory?.SubCategoryEng === item.SubCategoryEng ||
                selectedSubcategory?.SubCategoryHin ===
                  item.SubCategoryHin) && (
                <FastImage
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
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <Animatable.View
            style={styles.selectLanguageContainer}
            animation="fadeInDown"
            duration={1000}
            direction="alternate"
            iterationCount={1}>
            <Text style={styles.title}>
              {currentLanguage === 'English'
                ? WordConstants.selectStory[0]
                : WordConstants.selectStory[1]}
            </Text>
          </Animatable.View>
          <FlatList
            data={storyArray.slice(0, 3)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainerStyle}
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}>
            <Text style={styles.continueText}>
              {currentLanguage === 'English'
                ? WordConstants.continueButton[0]
                : WordConstants.continueButton[1]}
            </Text>
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
    justifyContent: 'center',
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
    fontSize: 15,
    textAlign: 'center',
  },
  storyItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainerStyle: {
    justifyContent: 'center'
  }
});

export default SelectStory;
