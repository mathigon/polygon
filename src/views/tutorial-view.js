// -----------------------------------------------------------------------------
// Polygon - Tutorial View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image } from 'react-native';
import AppIntro from 'react-native-app-intro';
import Video from 'react-native-video';
const LOGO = require('../../images/logo-colour.png');
const TUTORIAL = require('../../images/intro-3.png');


export class Tutorial extends Component {

  render() {
    const size = Dimensions.get('window').width;

    return (<View style={{flex: 1}}>
      <StatusBar barStyle="dark-content"/>
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
          <Image level={15} style={styles.logo} source={LOGO}/>
          <Video source={require('../../images/intro-1.mp4')}
                   style={{width: size, height: size}}
                   muted={true}
                   resizeMode="cover"
                   playWhenInactive={true}
                   repeat={true}/>
          <View level={-20}><Text style={styles.text}>Find hidden polygons and scan them with your phone.</Text></View>
        </View>
        <View style={styles.slide}>
          <Video source={require('../../images/intro-2.mp4')}
                 style={{width: size, height: size}}
                 muted={true}
                 resizeMode="cover"
                 playWhenInactive={true}
                 repeat={true}/>
          <View level={-20}><Text style={styles.text}>Once you have enough polygons, they combine to make 3-dimensional polyhedra.</Text></View>
        </View>
        <View style={styles.slide}>
          <Image source={TUTORIAL} style={{width: 300, height: 320}}/>
          <View level={-20}><Text style={styles.text}>Complete all polyhedra, solve powerups and get badges!</Text></View>
        </View>
      </AppIntro>
    </View>)
  }
}


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: 60
  },
  text: {
    color: '#555',
    textAlign: 'center',
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book'
  },
  logo: {
    width: 300,
    height: 70,
  }
});
