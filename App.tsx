import {View, Text, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {setupPlayer, addTrack} from './musicServices';
import MusicPlayer from './src/screens/MusicPlayer';

const App = () => {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    Setup();
  }, []);

  const Setup = async () => {
    try {
      let setup = await setupPlayer();

      if (setup) {
        await addTrack();
      }
      setPlayerReady(setup);
    } catch (err) {
      console.error(err);
    }
  };

  if (!playerReady) {
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MusicPlayer></MusicPlayer>
    </View>
  );
};

export default App;
