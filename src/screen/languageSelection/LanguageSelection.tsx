import React from 'react';
import { View } from 'react-native';
import AppText from '../../globals/components/appText/AppTest';

const LanguageSelection = () => {
    return (
        <View>
            <AppText
                regular
                color={'#000'}
                text={'Language Selection'}
                fontSize={20}
            />
        </View>
    );
};

export default LanguageSelection;