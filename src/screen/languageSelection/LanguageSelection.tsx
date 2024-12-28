import React from 'react';
import { Button, View } from 'react-native';
import AppText from '../../globals/components/appText/AppTest';
import { Screen } from '../../constants/ScreenName';

const LanguageSelection = ({ navigation }) => {
    return (
        <View>
            <AppText
                regular
                color={'#000'}
                text={'Language Selection'}
                fontSize={20}
            />
            <Button
                title="Select English"
                onPress={() => navigation.navigate(Screen.ageSelection)}
            />
        </View>
    );
};

export default LanguageSelection;