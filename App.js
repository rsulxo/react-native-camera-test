import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, CameraRoll} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    ratio: "1:1"
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref = {ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity 
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
              }}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Flip{' '}
              </Text>
              
            </TouchableOpacity>
          </View>
          <Button
                title="Snap!"
                onPress={ async () => {
                    if (this.camera) {
                      let photo = await this.camera.takePictureAsync();
                      console.log(photo.uri);
                      CameraRoll.saveToCameraRoll(photo.uri)
                    }
                  }
                }
                containerViewStyle={{
                  alignSelf: 'stretch',
                }}
              />
        </Camera> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'relative',
    width: 200,
    height: 50,
    bottom: 0,
    left: 30,
    backgroundColor: 'red',
    zIndex: 100,
  }
});
