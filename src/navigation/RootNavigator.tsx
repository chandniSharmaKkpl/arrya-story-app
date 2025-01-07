import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelection from '../screen/languageSelection/LanguageSelection';
import { Screen } from '../constants/ScreenName';
import AgeSelection from '../screen/ageSelection/AgeSelection';
import StoryList from '../screen/storyList/StoryList';
import Player from '../screen/player/Player';
import StoryDetails from '../screen/storyDetails/StoryDetails';
import SplashScreen from '../screen/splashScreen/SplashScreen';
import SelectCategory from '../screen/selectCategory/SelectCategory';
import SelectStory from '../screen/selectStory/SelectStory';


const Stack = createNativeStackNavigator();

const MainRoute: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screen.splashScreen} >
                <Stack.Screen
                    name={Screen.languageSelection}
                    component={LanguageSelection}
                    options={{ title: 'Select Language', headerShown: false }}
                />
                <Stack.Screen name={Screen.ageSelection} component={AgeSelection} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.selectCategory} component={SelectCategory} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.selectStory} component={SelectStory} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.storyList} component={StoryList} />
                <Stack.Screen name={Screen.storyDetails} component={StoryDetails} options={{ headerShown: false }}/>
                <Stack.Screen name={Screen.player} component={Player} />
                <Stack.Screen name={Screen.splashScreen} component={SplashScreen} options={{ headerShown: false, gestureEnabled: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRoute;
