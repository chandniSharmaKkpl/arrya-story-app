import React from 'react';
import { Button, Text, View } from 'react-native';
import { Screen } from '../../constants/ScreenName';

const AgeSelection = ({ navigation }) => {
    return (
        <View>
            <Text>Age Selection Screen</Text>
            <Button
                title="Select English"
                onPress={() => navigation.navigate(Screen.storyList)}
            />
        </View>
    );
};

export default AgeSelection;