import React, { FC } from 'react';
import { Text } from 'react-native';
import { ITextEvent } from '../../../types/components/appText/appText.types';
import { StyleSheet } from 'react-native';


const AppText: FC<ITextEvent> = ({
    text,
    style,
    onPress,
    extraBold,
    bold,
    thin,
    regular,
    medium,
    semibold,
    color,
    fontSize,
    disabled = false,
    testID,
}) => {
    return (
        <Text
            testID={testID}
            onPress={onPress}
            disabled={disabled}
            style={[
                style,
                extraBold && TextStyles.extraBold,
                bold && TextStyles.bold,
                regular && TextStyles.regular,
                semibold && TextStyles.semibold,
                medium && TextStyles.medium,
                thin && TextStyles.thin,
                fontSize ? { fontSize: fontSize } : undefined,

                color ? { color: color } : undefined,
            ]}
        >
            {text}
        </Text>
    );
};

export default AppText;

export const TextStyles = StyleSheet.create({
    extraBold: {
        fontFamily: 'Poppins-ExtraBold',
    },
    bold: {
        fontFamily: 'Poppins-Bold',
    },
    semibold: {
        fontFamily: 'Poppins-SemiBold',
    },
    medium: {
        fontFamily: 'Poppins-Medium',
    },
    thin: {
        fontFamily: 'Poppins-Light',
    },
    regular: {
        fontFamily: 'Poppins-Regular',
    },
});

