import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelection from '../screen/languageSelection/LanguageSelection';
import { Screen } from '../constants/ScreenName';
import AgeSelection from '../screen/ageSelection/AgeSelection';
import Player from '../screen/player/Player';
import StoryDetails from '../screen/storyDetails/StoryDetails';
import SplashScreen from '../screen/splashScreen/SplashScreen';
import SelectCategory from '../screen/selectCategory/SelectCategory';
import SelectStory from '../screen/selectStory/SelectStory';
import SelfRecordingScreen from '../screen/selfRecording/SelfRecordingScreen';
import { Platform } from 'react-native';


const Stack = createNativeStackNavigator();

const MainRoute: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screen.splashScreen} >
                <Stack.Screen
                    name={Screen.languageSelection}
                    component={LanguageSelection}
                    options={{ title: 'Select Language', headerShown: false, animation: Platform.OS === 'ios' ? 'fade' : 'default' }}
                />
                <Stack.Screen name={Screen.ageSelection} component={AgeSelection} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.selectCategory} component={SelectCategory} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.selectStory} component={SelectStory} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.storyDetails} component={StoryDetails} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.player} component={Player} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.selfRecording} component={SelfRecordingScreen} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.splashScreen} component={SplashScreen} options={{ headerShown: false, gestureEnabled: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRoute;
