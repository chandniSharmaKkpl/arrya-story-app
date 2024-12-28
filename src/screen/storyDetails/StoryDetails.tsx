/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import AppText from '../../globals/components/appText/AppTest';
import { Screen } from '../../constants/ScreenName';

const StoryDetails = ({ navigation, route }) => {

    const storyData = route?.params?.storyData;

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <AppText
                    semibold
                    color={'#000'}
                    text={storyData.Story_Name}
                    fontSize={26}
                />
                <TouchableOpacity style={{ height: 40, width: 40, marginVertical: 20 }} onPress={() => navigation.navigate(Screen.player, {
                    storyData: storyData,

                })}>
                    <Image
                        source={require('../../assets/images/PlayMusic.png')}
                        style={{ height: '100%', width: '100%' }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.storyContainer}>
                <AppText
                    regular
                    color={'#000'}
                    text={storyData.Story}
                    fontSize={18}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
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
});

export default StoryDetails;
