import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { StackNavigator } from 'react-navigation';
import Confetti from 'react-native-confetti';

import { HomeView } from './views/home-view'
import { PolyhedraView } from './views/polyhedra-view'
import { BadgesView } from './views/badges-view'
import { AboutView } from './views/about-view'
import { CameraView } from './views/camera-view'
import { PowerupView } from './views/powerup-view'
import { PolyhedronView } from './views/polyhedron-view'
// import { ARView } from './views/ar-view'

import { State } from './state.js'
import { TabBar } from './components/tab-bar.js'
import { PolygonModal, PolyhedronModal, PowerupModal, BadgeModal } from './components/modals.js'

const BACKGROUND = require('../images/background.jpg');


export class HomeScreen extends Component {
  render() {
    const {navigation, screenProps} = this.props;
    const {state, app} = screenProps;

    return (
      <Image source={BACKGROUND} style={{flex: 1, width: null, height: null}} resizeMode="cover">
        <ScrollableTabView tabBarPosition="overlayBottom" renderTabBar={() => <TabBar/>} prerenderingSiblingsNumber={1}>
          <HomeView tabLabel="Polygons" navigation={navigation} state={state}/>
          <PolyhedraView tabLabel="Polyhedra" navigation={navigation} state={state}/>
          <BadgesView tabLabel="Badges" navigation={navigation} state={state} app={app}/>
          <AboutView tabLabel="More" navigation={navigation}/>
        </ScrollableTabView>
      </Image>
    );
  }
}

const Body = StackNavigator({
  Home: { screen: HomeScreen },
  Polyhedron: { screen: PolyhedronView },
  Camera: { screen: CameraView },
  // AR: { screen: ARView },
  Powerup: { screen: PowerupView },
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

export default class App extends Component {

  constructor() {
    super();
    this.state = new State(this);
  }

  openModal(name, args) {
    let modal = this.refs[name];
    if (modal) modal.open(args);
  }

  triggerConfetti() {
    this.refs.confetti.startConfetti();
    setTimeout(() => { this.refs.confetti.stopConfetti(); }, 3000);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <Body style={{flex: 1}} screenProps={{state: this.state, app: this}}/>
        <PolygonModal ref={'polygonModal'}/>
        <PolyhedronModal ref={'polyhedronModal'} app={this}/>
        <PowerupModal ref={'powerupModal'} state={this.state} app={this}/>
        <BadgeModal ref={'badgeModal'}/>
        <Confetti ref={'confetti'} confettiCount={400} timeout={20} duration={4000}
                  colors={['#FBC600', '#0095FF', '#00A826', '#CE001C', '#8600A9', '#FF710E']}/>
      </View>
    );
  }
}
