import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playList} from '../constants';
import ControlCenter from '../components/ControlCenter';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.lastPosition);
        setTrack(playingTrack);
        break;
    }
  });

  const renderArtwork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}></Image>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playList}
        renderItem={renderArtwork}
        keyExtractor={song => song.id.toString()}></FlatList>

      <SongInfo track={track}></SongInfo>
      <SongSlider></SongSlider>
      <ControlCenter></ControlCenter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default MusicPlayer;
