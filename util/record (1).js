import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Buffer } from 'buffer';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob'

export default class Record extends Component {
    sound = null;
    state = {
        audioFile: '',
        recording: false,
        loaded: false,
        paused: true
    };

    async componentDidMount() {
        await this.checkPermission();

        const options = {
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            wavFile: 'test.wav'
        };

        AudioRecord.init(options);

        AudioRecord.on('data', data => {
            const chunk = Buffer.from(data, 'base64');
            console.log('chunk size', chunk.byteLength);
            // do something with audio chunk
        });
    }

    checkPermission = async () => {
        check(PERMISSIONS.ANDROID.RECORD_AUDIO)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch(error => {
                // …
            });




        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch(error => {
                // …
            });

        return this.requestPermission()


    };


    change=async()=> {
        console.log('inside cahangee')
        try {
            const {config, fs} = RNFetchBlob;
            const downloads = fs.dirs.DownloadDir;
            return config({

                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: downloads + this.state.audioFile+ '.mp3',
                },


            })
                .fetch('GET', url).then((res) => {

                    alert(res.path())
                });

        }
        catch (e) {

        }
    }

    requestPermission = async () => {




        request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {


            this.reqexternal()
        });


    };

    reqexternal=async ()=>{
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {

        });

    }

    start = () => {
        console.log('start record');
        this.setState({ audioFile: '', recording: true, loaded: false });
        AudioRecord.start();
    };

    stop = async () => {
        if (!this.state.recording) return;
        console.log('stop record');
        let audioFile = await AudioRecord.stop();
        this.change()
        console.log('audioFile', audioFile);
        this.setState({ audioFile, recording: false });
    };

    load = () => {
        return new Promise((resolve, reject) => {
            if (!this.state.audioFile) {
                return reject('file path is empty');
            }

            this.sound = new Sound(this.state.audioFile, '', error => {
                if (error) {
                    console.log('failed to load the file', error);
                    return reject(error);
                }
                this.setState({ loaded: true });
                return resolve();
            });
        });
    };

    play = async () => {
        if (!this.state.loaded) {
            try {
                await this.load();
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ paused: false });
        Sound.setCategory('Playback');

        this.sound.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({ paused: true });
            // this.sound.release();
        });
    };

    pause = () => {
        this.sound.pause();
        this.setState({ paused: true });
    };

    render() {
        const { recording, paused, audioFile } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button onPress={this.start} title="Record" disabled={recording} />
                    <Button onPress={this.stop} title="Stop" disabled={!recording} />
                    {paused ? (
                        <Button onPress={this.play} title="Play" disabled={!audioFile} />
                    ) : (
                        <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});
