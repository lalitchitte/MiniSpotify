import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {playBackService} from '../../musicServices';

const ControlCenter = () => {
  const playback = usePlaybackState().state;
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayBack = async (playBack: State) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playBack === State.Paused || playBack === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40}></Icon>
      </Pressable>

      <Pressable onPress={() => togglePlayBack(playback)}>
        <Icon
          style={styles.icon}
          name={playback === State.Playing ? 'pause' : 'play-arrow'}
          size={75}></Icon>
      </Pressable>

      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40}></Icon>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
