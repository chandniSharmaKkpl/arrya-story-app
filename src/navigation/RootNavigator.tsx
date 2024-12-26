import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelection from '../screen/languageSelection/LanguageSelection';
import { Screen } from '../constants/ScreenName';
import AgeSelection from '../screen/ageSelection/AgeSelection';

const Stack = createNativeStackNavigator();

const MainRoute: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screen.languageSelection}>
                <Stack.Screen
                    name={Screen.languageSelection}
                    component={LanguageSelection}
                    options={{ title: 'Select Language' }}
                />
                <Stack.Screen name={Screen.ageSelection} component={AgeSelection} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRoute;
