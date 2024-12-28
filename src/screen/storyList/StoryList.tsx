/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Papa from 'papaparse';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import axios from 'axios';
import AppText from '../../globals/components/appText/AppTest';
import { Screen } from '../../constants/ScreenName';

const StoryList = ({ navigation }) => {

    const STORY_FILE =
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQs9fHrUpJTDHoMHEKJSMaAZOqsW5miQhEMYunUoKj2K2MQOkzQUF_6cCln_PKi9Ap9THtrrUyMkMKd/pub?gid=0&single=true&output=csv';

    const GOOGLE_API_KEY = 'AIzaSyB4haSplaBMoJ9Si1Azu-Pc7mFjIZIU1cc';

    const [storyArray, setStoryArray] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log('storyArray', storyArray);


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

    let currentSound = null;

    const playAudio = music => {
        // Stop current audio if any
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
            // Start playback
            currentSound.play();
        });
    };

    const playStory = async item => {
        // If a previous story is playing, stop it first
        if (currentSound) {
            currentSound.stop(() => {
                console.log('Stopped previous story');
            });
        }
        // Play the new story
        geminiTextToSpeech(item.Story);
    };

    const stopAudio = () => {
        if (currentSound) {
            currentSound.stop(() => {
                console.log('Audio stopped');
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
            // Send POST request to Text-to-Speech API
            const response = await axios.post(address, payload);
            const result = response.data;

            // Save audio content to local file
            await RNFS.writeFile(path, result.audioContent, 'base64');

            // Initiate playback of synthesized speech
            playAudio(path);
        } catch (err) {
            console.warn(err);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.storyContainer} onPress={() =>
                navigation.navigate(Screen.storyDetails, {
                    storyData: item,

                })
            }>
                <AppText
                    regular
                    color={'#000'}
                    text={item.Story_Name}
                    fontSize={20}
                />
                {/* <Text style={styles.storyText}>{item.Story}</Text> */}
                {/* <View>
                    <Button
                        title="Play"
                        onPress={() => playStory(item)} // Play this story
                    />
                    <View style={{ marginTop: 10 }}>
                        <Button title="Stop" onPress={stopAudio} color="red" />
                    </View>
                </View> */}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={storyArray}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{
                        width: '100%',
                    }}
                />
            )}
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
    title: {
        fontSize: 20,
    },
    storyContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    storyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    storyText: {
        fontSize: 16,
        color: '#555',
        flexWrap: 'wrap',
    },
});

export default StoryList;
