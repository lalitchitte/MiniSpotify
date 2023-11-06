/**
 * @format
 */
import TrackPlayer from 'react-native-track-player';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {playBackService} from './musicServices';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playBackService);
