// -----------------------------------------------------------------------------
// Polygon - Tutorial View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AppIntro from 'react-native-app-intro';
import Video from 'react-native-video';


export class Tutorial extends Component {

  render() {
    const size = Dimensions.get('window').width;

    return (
      <AppIntro dotColor="#ccc"
                activeDotColor="#999"
                rightTextColor="#999"
                leftTextColor="#999"
                customStyles={{btnContainer: {flex: 1}}}
                onDoneBtnClick={() => this.props.onDone()}
                doneBtnLabel="Done"
                nextBtnLabel="Next"
                showSkipButton={false}>
        <View style={styles.slide}>
            <Video source={require('../../images/intro-1.mp4')}
                   level={0}
                   style={{width: size, height: size}}
                   muted={true}
                   playWhenInactive={true}
                   repeat={true}/>
          <View level={10}><Text style={styles.text}>Find hidden polygons and scan them with your phone.</Text></View>
        </View>
        <View style={styles.slide}>
          <Video source={require('../../images/intro-2.mp4')}
                 level={0}
                 style={{width: size, height: size}}
                 muted={true}
                 playWhenInactive={true}
                 repeat={true}/>
          <View level={10}><Text style={styles.text}>Once you have enough polygons, they combine to make 3-dimensional polyhedra.</Text></View>
        </View>
        <View style={styles.slide}>
          <View level={8}><Text style={styles.text}>Page 3</Text></View>
          <View level={0}><Text style={styles.text}>Page 3</Text></View>
          <View level={-10}><Text style={styles.text}>Page 3</Text></View>
        </View>
      </AppIntro>
    )
  }
}


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  text: {
    color: '#333',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
