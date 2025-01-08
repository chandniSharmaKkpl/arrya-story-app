/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import axios from 'axios';
import AppText from '../../globals/components/appText/AppTest';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {Colors} from '../../constants/Colors';
import userData from '../../helpers/userData';
import {Images} from '../../constants/Images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Slider from '@react-native-community/slider';
import {categories} from '../../constants/CategoryConstant';

const Player = ({navigation, route}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const storyData = route?.params?.storyData;
  const currentSoundRef = useRef<Sound | null>(null); // Using useRef for persistent sound reference
  const intervalRef = useRef<NodeJS.Timer | null>(null); // Ref for interval to track current time
  console.log('storyData=========-------->', storyData);
  const GOOGLE_API_KEY = 'AIzaSyB4haSplaBMoJ9Si1Azu-Pc7mFjIZIU1cc';
  const adId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-8022775059437835/4453507095';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await userData.getUserData();
      console.log('Refreshed userData on selectCategoryScreen', data);
      setCurrentLanguage(data.selectedLanguage);
    });
    return unsubscribe;
  }, [navigation]);

  const getCategoryName = (currentLanguage: string, categoryName: string | number) => {
    // Map to handle custom name matching
    const nameMapping = {
      FairyTales: 'FAIRY TALES',
      Animals: 'ANIMALS',
      ScienceAdventure: 'SCIENCE',
      Geography: 'GEOGRAPHY',
      History: 'HISTORY',
      SuperHero: 'SUPERHERO',
    };

    // Find the mapped name for the given categoryName
    const mappedName = nameMapping[categoryName];

    // If a mapped name exists, find it in the categories array
    if (mappedName) {
      const category = categories.find(cat => cat.nameEng === mappedName);
      if (category) {
        return currentLanguage === 'Hindi' ? category.nameHin : categoryName;
      }
    }
    return null;
  };

  // Create the RewardedAd instance
  //   const rewarded = RewardedAd.createForAdRequest(adId, {
  //     keywords: ['fashion', 'clothing'],
  //   });

  //   useEffect(() => {
  //     const unsubscribeLoaded = rewarded.addAdEventListener(
  //       RewardedAdEventType.LOADED,
  //       () => {
  //         rewarded.show();
  //       },
  //     );

  //     const unsubscribeEarned = rewarded.addAdEventListener(
  //       RewardedAdEventType.EARNED_REWARD,
  //       reward => {
  //         console.log('User earned reward of ', reward);
  //       },
  //     );

  //     rewarded.load();

  //     return () => {
  //       unsubscribeLoaded();
  //       unsubscribeEarned();
  //     };
  //   }, []);

  // let currentSound: Sound | null = null;

  const playAudio = (path: string) => {
    if (currentSoundRef.current) {
      currentSoundRef.current.stop(() => console.log('Stopped previous audio'));
    }

    currentSoundRef.current = new Sound(path, '', error => {
      if (error) {
        console.warn('Failed to load the sound', error);
        return;
      }
      setDuration(currentSoundRef.current?.getDuration() || 0);
      currentSoundRef?.current?.play(() => {
        console.log('Playback finished successfully');
        clearInterval(intervalRef.current);
        setCurrentTime(0);
      });
    });

    currentSoundRef.current.setCurrentTime(0);
    currentSoundRef.current.getCurrentTime(seconds => setCurrentTime(seconds));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentSoundRef.current?.isPlaying()) {
        currentSoundRef.current.getCurrentTime(seconds =>
          setCurrentTime(seconds),
        );
      } else {
        clearInterval(intervalRef.current);
      }
    }, 1000);
  };

  const playStory = async (storyItem: any) => {
    console.log('storyItem:', storyItem);

    if (currentSoundRef.current) {
      currentSoundRef.current.stop(() => {
        console.log('Stopped previous story');
      });
    }

    geminiTextToSpeech(storyItem);
  };

  const pauseAudio = () => {
    if (currentSoundRef.current?.isPlaying()) {
      currentSoundRef.current.pause(() => setIsPaused(true));
    }
  };

  const resumeAudio = () => {
    if (currentSoundRef.current && isPaused) {
      currentSoundRef.current.play(() => setIsPaused(false));
    }
  };

  const stopAudio = () => {
    if (currentSoundRef.current) {
      currentSoundRef.current.stop(() => {
        setIsPaused(false);
        setCurrentTime(0);
      });
    }
  };

  const createRequest = (text: any) => ({
    input: {
      ssml: `<speak>${text}</speak>`,
    },
    voice: {
      languageCode: 'en-IN',
      name: 'en-IN-Wavenet-A',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.8,
      pitch: 0.0,
      volumeGainDb: 0.0,
      effectsProfileId: ['handset-class-device'],
    },
  });

  const geminiTextToSpeech = async (text: any) => {
    const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
    const payload = createRequest(text);
    const path = `${RNFS.DocumentDirectoryPath}/voice.mp3`;

    try {
      const response = await axios.post(address, payload);
      const result = response.data;

      await RNFS.writeFile(path, result.audioContent, 'base64');

      const fileStats = await RNFS.stat(path);
      console.log('Audio file size:', fileStats.size);

      if (fileStats.size > 0) {
        playAudio(path);
      } else {
        console.warn('Audio file is empty or corrupt.');
      }

      playAudio(path);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.animalsImage}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>
        {getCategoryName(currentLanguage, storyData?.Category)}
      </Text>
      <Text style={styles.subtitle}>
        {currentLanguage === 'English'
          ? storyData?.SubCategoryEng
          : storyData?.SubCategoryHin}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onValueChange={value => currentSoundRef.current?.setCurrentTime(value)}
        minimumTrackTintColor={Colors.hindiLanguageTextColor}
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor={Colors.hindiLanguageTextColor}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            playStory(
              currentLanguage === 'English'
                ? storyData?.StoryEnglish
                : storyData?.StoryHindi,
            )
          }>
          <Text style={styles.button}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseAudio}>
          <Text style={styles.button}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resumeAudio}>
          <Text style={styles.button}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopAudio}>
          <Text style={styles.button}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.playerScreenColor,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    backgroundColor: 'white',
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%'),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.hindiLanguageTextColor,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.hindiLanguageTextColor,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.hindiLanguageTextColor,
    marginBottom: 30,
  },
  slider: {
    // backgroundColor: 'red',
    width: '80%',
    height: 40,
  },
  timeContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    fontSize: 16,
    color: Colors.hindiLanguageTextColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.hindiLanguageTextColor,
    textAlign: 'center',
  },
});

export default Player;
