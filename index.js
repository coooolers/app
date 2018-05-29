import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

// TODO: ignore some development errors
// https://github.com/react-navigation/react-navigation/issues/3956
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('Pursoo', () => App);