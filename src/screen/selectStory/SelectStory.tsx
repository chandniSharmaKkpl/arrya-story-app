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
import LinearGradient from 'react-native-linear-gradient';
import {categories} from '../../constants/CategoryConstant';

const SelectStory = ({navigation, route}) => {
  const [storyArray, setStoryArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const subCategories = route?.params?.subCategory;

  const handleContinue = (category: any) => {
    setSelectedSubcategory(category);
    navigation.navigate(Screen.storyDetails, {
      storyData: category,
    });
  };

  const getCategoryFile = (categoryName: any) => {
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

  const getBackgroundColor = (index: any) => {
    switch (index) {
      case 0:
        return Colors.ageCardColor1;
      case 1:
        return Colors.ageCardColor2;
      case 2:
        return Colors.ageCardColor3;
      case 3:
        return Colors.superHeroBgColor;
      case 4:
        return Colors.animalBgColor;
      case 5:
        return Colors.ageCardColor1;
      default:
        return null;
    }
  };

  const getCategoryName = (
    currentLanguage: string,
    categoryName: string | number,
  ) => {
    const nameMapping = {
      FairyTales: 'FAIRY TALES',
      Animals: 'ANIMALS',
      ScienceAdventure: 'SCIENCE',
      Geography: 'GEOGRAPHY',
      History: 'HISTORY',
      SuperHero: 'SUPERHERO',
    };

    const mappedName = nameMapping[categoryName];

    if (mappedName) {
      const category = categories.find(cat => cat.nameEng === mappedName);
      if (category) {
        return currentLanguage === 'Hindi' ? category.nameHin : categoryName;
      }
    }
    return null;
  };

  const fetchStory = async () => {
    const getCategory = getCategoryFile(subCategories.nameEng);
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
    console.log('item', item);
    return (
      <Animatable.View
        animation="zoomIn"
        delay={index * 200}
        direction="alternate"
        iterationCount={1}>
        <TouchableOpacity
          style={[styles.card, {backgroundColor: getBackgroundColor(index)}]}
          onPress={() => handleContinue(item)}>
          <View style={styles.heroImage}>
            <Text style={styles.cardText}>
              {getCategoryName(currentLanguage, item.Category)}
            </Text>
            <Text style={styles.cardText}>
              {currentLanguage === 'English'
                ? item.SubCategoryEng
                : item.SubCategoryHin}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.ageSelectionScreenBg1, Colors.selectStoryLinearGradient]}
      style={styles.container}>
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
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainerStyle}
          />
        </>
      )}
    </LinearGradient>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    flex: 1,
    margin: wp('3.5%'),
    height: hp('20%'),
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    // borderColor: '#F6A5AD',
    // borderWidth: 2,
  },
  heroImage: {
    height: hp('16%'),
    width: hp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    backgroundColor: '#ED4C5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontFamily: Fonts.katibeh_regular,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
});

export default SelectStory;
