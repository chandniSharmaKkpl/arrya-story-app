import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelection from '../screen/languageSelection/LanguageSelection';
import { Screen } from '../constants/ScreenName';
import AgeSelection from '../screen/ageSelection/AgeSelection';
import StoryList from '../screen/storyList/StoryList';
import Player from '../screen/player/Player';
import StoryDetails from '../screen/storyDetails/StoryDetails';

const Stack = createNativeStackNavigator();

const MainRoute: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screen.languageSelection}>
                <Stack.Screen
                    name={Screen.languageSelection}
                    component={LanguageSelection}
                    options={{ title: 'Select Language', headerShown: false }}
                />
                <Stack.Screen name={Screen.ageSelection} component={AgeSelection} options={{ title: 'Select Language', headerShown: false }}/>
                <Stack.Screen name={Screen.storyList} component={StoryList} />
                <Stack.Screen name={Screen.storyDetails} component={StoryDetails} />
                <Stack.Screen name={Screen.player} component={Player} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRoute;
