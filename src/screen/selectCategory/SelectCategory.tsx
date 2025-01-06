import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {categories} from '../../constants/SelectCategory';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../../constants/Fonts';
import {Images} from '../../constants/Images';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../constants/ScreenName';

const CategoryScreen = () => {
  const navigation = useNavigation();

    const getCategoryImage = (categoryName: any) => {
        switch (categoryName) {
          case 'FAIRY TALES':
            return Images.happyFairyImage;
          case 'ANIMALS':
            return Images.animalsImage;
          case 'SUPERHERO':
            return Images.superHeroImage;
          case 'SCIENCE':
            return Images.scienceImage;
          case 'GEOGRAPHY':
            return Images.geographyImage;
          case 'HISTORY':
            return Images.historyImage;
          default:
            return null
        }
      };

  const renderItem = ({item}: any) => (
    <Animatable.View animation="zoomIn" direction="alternate" iterationCount={1}>
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(Screen.selectStory)}>
      <Image source={getCategoryImage(item.name)} style={styles.heroImage} resizeMode='contain'/>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.selectLanguageContainer}>
        <Text style={styles.title}>Select Category</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('2%'),
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: Fonts.poppins_medium,
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 18,
    height: hp('20%'),
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 5,
    borderColor: '#F6A5AD',
    borderWidth: 2,
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
    fontFamily: Fonts.portligatslab_regular,
    fontSize: 16,
    color: '#fff',
  },
  selectLanguageContainer: {
    marginTop: hp('5%'),
  },
  heroImage: {
    height: hp('16%'),
    width: hp('20%'),
  }
});

export default CategoryScreen;
