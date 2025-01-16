import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import SoundRecorder from 'react-native-sound-recorder';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [recordedFiles, setRecordedFiles] = useState([]);
  const [currentPlayingFile, setCurrentPlayingFile] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchRecordings();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        if (
          granted['android.permission.RECORD_AUDIO'] !== 'granted' ||
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
          granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
        ) {
          Alert.alert('Permissions required', 'Please grant all permissions to use this feature.');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const fetchRecordings = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const downloadDir = RNFS.DownloadDirectoryPath;
    try {
      const files = await RNFS.readDir(downloadDir);
      const audioFiles = files
        .filter((file) => file.name.endsWith('.mp4')) // Filter audio files by extension
        .map((file) => file.path); // Extract file paths
      setRecordedFiles(audioFiles);
      console.log('Fetched recordings:', audioFiles);
    } catch (err) {
      // console.error('Error fetching recordings:', err);
    }
  };

  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const timestamp = new Date().getTime();
    const fileName = `test_${timestamp}.mp4`;

    SoundRecorder.start(SoundRecorder.PATH_CACHE + `/${fileName}`)
      .then(() => {
        setRecording(true);
        console.log('Recording started');
      })
      .catch((error) => console.error('Failed to start recording', error));
  };

  const stopRecording = async () => {
    SoundRecorder.stop()
      .then(async (result) => {
        console.log('Recording stopped. File saved at:', result.path);

        const fileExists = await RNFS.exists(result.path);
        if (!fileExists) {
          console.error('File does not exist at the recorded path:', result.path);
          return;
        }

        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const destinationPath = `${RNFS.DownloadDirectoryPath}/${result.path.split('/').pop()}`;

        RNFS.moveFile(result.path, destinationPath)
          .then(() => {
            console.log('File successfully moved to:', destinationPath);
            setRecordedFiles((prevFiles) => [...prevFiles, destinationPath]);
            Alert.alert('Recording Saved', `File saved to: ${destinationPath}`);
          })
          .catch((err) => console.error('Error moving file:', err));

        setRecording(false);
      })
      .catch((error) => console.error('Failed to stop recording', error));
  };

  const togglePlayback = (file) => {
    // Stop the currently playing sound if it is not the same file
    if (currentPlayingFile && currentPlayingFile !== file && currentSound) {
      currentSound.stop(() => {
        currentSound.release();
        setCurrentPlayingFile(null);
        setIsPlaying(false);
      });
    }

    if (currentPlayingFile === file && isPlaying) {
      // Pause the current sound
      currentSound.pause();
      setIsPlaying(false);
    } else {
      // Play the sound
      const sound = new Sound(file, null, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }

        setCurrentSound(sound);
        setCurrentPlayingFile(file);
        setIsPlaying(true);
        sound.play((success) => {
          if (success) {
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }

          setIsPlaying(false);
          setCurrentPlayingFile(null);
          sound.release();
        });
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.split('/').pop()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => togglePlayback(item)}
      >
        <Text style={styles.buttonText}>
          {currentPlayingFile === item && isPlaying ? 'Pause' : 'Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Recorder and Player</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordedFiles.length > 0 && (
        <>
          <Text style={styles.subtitle}>Recordings List:</Text>
          <FlatList
            data={recordedFiles}
            keyExtractor={(item) => item}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default App;
