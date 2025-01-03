/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    View,
    Button,
    StyleSheet,
    Platform,
} from 'react-native';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import axios from 'axios';
import AppText from '../../globals/components/appText/AppTest';
import {RewardedAd, RewardedAdEventType, TestIds} from 'react-native-google-mobile-ads';

const Player = ({ navigation, route }) => {
    const storyData = route?.params?.storyData;

    const GOOGLE_API_KEY = 'AIzaSyB4haSplaBMoJ9Si1Azu-Pc7mFjIZIU1cc';

    const adId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-8022775059437835/4453507095';


// Create the RewardedAd instance
const rewarded = RewardedAd.createForAdRequest(adId, {
    keywords: ['fashion', 'clothing'],
  });

useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);


    let currentSound = null;
    const [isPaused, setIsPaused] = useState(false);

    const playAudio = music => {
        if (currentSound) {
            currentSound.stop(() => {
                console.log('Stopped previous audio');
            });
        }

        currentSound = new Sound(music, '', error => {
            if (error) {
                console.warn('Failed to load the sound', error);
                return;
            }
            currentSound.play(success => {
                if (success) {
                    console.log('Playback finished successfully');
                } else {
                    console.warn('Playback failed due to audio decoding errors');
                }
            });
        });
    };

    const playStory = async storyItem => {
        console.log('storyItem:', storyItem);

        if (currentSound) {
            currentSound.stop(() => {
                console.log('Stopped previous story');
            });
        }

        geminiTextToSpeech(storyItem);
    };

    const pauseAudio = () => {
        if (currentSound && currentSound.isPlaying()) {
            currentSound.pause(() => {
                console.log('Audio paused');
                setIsPaused(true);
            });
        }
    };

    const resumeAudio = () => {
        if (currentSound && isPaused) {
            currentSound.play(() => {
                console.log('Audio resumed');
                setIsPaused(false);
            });
        }
    };

    const stopAudio = () => {
        if (currentSound) {
            currentSound.stop(() => {
                console.log('Audio stopped');
                setIsPaused(false);
            });
        }
    };

    const createRequest = text => ({
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

    const geminiTextToSpeech = async text => {
        const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
        const payload = createRequest(text);
        const path = `${RNFS.DocumentDirectoryPath}/voice.mp3`;

        try {
            const response = await axios.post(address, payload);
            const result = response.data;

            await RNFS.writeFile(path, result.audioContent, 'base64');

            playAudio(path);
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={styles.container}>
            <AppText
                regular
                color={'#000'}
                text={storyData.Story_Name}
                fontSize={20}
                style={{ flex: 1 }}
            />
            <View>
                <Button
                    title="Play"
                    onPress={() => playStory(storyData?.Story)}
                />
                <View style={{ marginTop: 10 }}>
                    <Button
                        title="Pause"
                        onPress={pauseAudio}
                        color="orange"
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button
                        title="Resume"
                        onPress={resumeAudio}
                        color="green"
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button
                        title="Stop"
                        onPress={stopAudio}
                        color="red"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default Player;
