// -----------------------------------------------------------------------------
// Polygon - Main App
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import {View, Image, StatusBar, AsyncStorage, Alert} from 'react-native';

import { StackNavigator } from 'react-navigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Confetti from 'react-native-confetti';
import SplashScreen from 'react-native-splash-screen'

import { HomeView } from './views/home-view'
import { PolyhedraView } from './views/polyhedra-view'
import { BadgesView } from './views/badges-view'
import { AboutView, AboutPageView } from './views/about-view'
import { CameraView } from './views/camera-view'
import { PowerupView } from './views/powerup-view'
import { PolyhedronView } from './views/polyhedron-view'
import { Tutorial } from './views/tutorial-view'
// import { ARView } from './views/ar-view'

import { TabBar } from './components/tab-bar'
import { PolygonModal, PolyhedronModal, PowerupModal, BadgeModal } from './components/modals'

import { polygons, polyhedra, badges } from './objects'
const BACKGROUND = require('../images/background.jpg');


// -----------------------------------------------------------------------------
// Combined Views

export class Main extends Component {
  render() {
    const app = this.props.screenProps.app;
    return (
      <Image source={BACKGROUND} style={{flex: 1, width: null, height: null}} resizeMode="cover">
        <ScrollableTabView tabBarPosition="overlayBottom" renderTabBar={() => <TabBar/>} prerenderingSiblingsNumber={1}>
          <HomeView tabLabel="Polygons" navigation={this.props.navigation} app={app}/>
          <PolyhedraView tabLabel="Polyhedra" navigation={this.props.navigation} app={app}/>
          <BadgesView tabLabel="Badges" app={app}/>
          <AboutView tabLabel="More" navigation={this.props.navigation}/>
        </ScrollableTabView>
      </Image>
    );
  }
}

const Navigator = StackNavigator({
  Main: {screen: Main},
  Camera: {screen: CameraView},
  Polyhedron: {screen: PolyhedronView},
  Powerup: {screen: PowerupView},
  AboutPage: {screen: AboutPageView}
  // AR: { screen: ARView }
}, {initialRouteName: 'Main', headerMode: 'none'});


// -----------------------------------------------------------------------------
// App Component

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      shapes: {3: [], 4: [], 5: [], 6: [], 8: [], 10: []},
      polyhedra: [],
      powerups: [],
      badges: [],
      tutorial: {intro: true, camera: true}
    };

    SplashScreen.hide()
  }

  componentDidMount() {
    const promises = Object.keys(this.state).map(key => {
      return AsyncStorage.getItem(key).then(value => {
        if (value) this.setState({[key]: JSON.parse(value)});
      })
    });
    Promise.all(promises).finally(() => setTimeout(() => SplashScreen.hide()));
  }

  updateState(key, fn) {
    // TODO Find a nicer way for copying the state object.
    const newVal = JSON.parse(JSON.stringify(this.state[key]));
    fn(newVal);
    AsyncStorage.setItem(key, JSON.stringify(newVal));
    return new Promise(fn => this.setState({[key]: newVal}, fn));
  }

  // ---------------------------------------------------------------------------

  async recomputeState() {
    for (let p of polyhedra) {
      if (p.completed(this.state) && !this.state.polyhedra.includes(p.key)) {
        await this.updateState('polyhedra', polyhedra => polyhedra.push(p.key));
        this.refs.polyhedronModal.queue(p);
      }
    }

    for (let b of badges) {
      if (b.validate(this.state) && !this.state.badges.includes(b.key)) {
        await this.updateState('badges', badges => badges.push(b.key));
        this.refs.badgeModal.queue(b);
      }
    }
  }

  addShape(shape) {
    let [_, key, id] = (shape || '').split('-');
    let polygon = polygons.find(p => p.key === key);

    if (!polygon)
      return Alert.alert('Error', 'This shape couldn’t be added. Please try again!');

    if (this.state.shapes[key].includes(id))
      return Alert.alert(`You’ve already added this ${polygon.name}!`,
        'Every shape can only be added once. Keep searching for other ones!');

    this.updateState('shapes', shapes => shapes[key].push(id))
      .then(() => this.recomputeState());
    this.refs.polygonModal.queue(polygon);
  }

  addPowerup(p) {
    if (this.state.powerups.includes(p.key)) return;
    this.updateState('powerups', powerups => powerups.push(p.key))
      .then(() => this.recomputeState());
  }

  triggerConfetti() {
    this.refs.confetti.startConfetti();
    setTimeout(() => this.refs.confetti.stopConfetti(), 3000);
  }

  completeTutorial() {
    this.updateState('tutorial', tutorial => tutorial.intro = false);
  }

  // ---------------------------------------------------------------------------

  render() {
    if (this.state.tutorial.intro)
      return <Tutorial onDone={() => this.completeTutorial()}/>;

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <Navigator style={{flex: 1}} screenProps={{app: this}}/>
        <PolygonModal ref={'polygonModal'}/>
        <PolyhedronModal ref={'polyhedronModal'} app={this}/>
        <PowerupModal ref="powerupModal" app={this}/>
        <BadgeModal ref="badgeModal"/>
        <Confetti ref="confetti" confettiCount={400} timeout={20} duration={3500}
                  colors={['#FBC600', '#0095FF', '#00A826', '#CE001C', '#8600A9', '#FF710E']}/>
      </View>
    );
  }
}
