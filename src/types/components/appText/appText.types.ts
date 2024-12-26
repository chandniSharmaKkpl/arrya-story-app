import { ColorValue, StyleProp, TextStyle } from 'react-native';

export interface ITextEvent {
  text?: string | number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  extraBold?: boolean;
  bold?: boolean;
  thin?: boolean;
  regular?: boolean;
  medium?: boolean;
  semibold?: boolean;
  color?: ColorValue | undefined;
  children?: string | any;
  fontSize?: number;
  disabled?: boolean;
  testID?: string;
}
