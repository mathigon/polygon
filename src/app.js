// -----------------------------------------------------------------------------
// Polygon App - Main App View
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Navigator, View, Image, StatusBar, StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { HomeView } from './views/home-view'
import { PolyhedraView } from './views/polyhedra-view'
import { BadgesView } from './views/badges-view'
import { AboutView } from './views/about-view'
import { CameraView } from './views/camera-view'
import { ShareView } from './views/share-view'
import { PuzzleView } from './views/puzzle-view'
import { PolyhedronView } from './views/polyhedron-view'

import { State } from './state.js'
import { TabBar } from './components/tab-bar.js'
import { PolygonModal, PolyhedronModal, BadgeModal } from './components/modals.js'

const BACKGROUND = require('../images/background.jpg');


export class App extends Component {

  constructor() {
    super();
    this.state = new State(this);
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Main':
        return <Image source={BACKGROUND} style={styles.background} resizeMode="cover">
          <ScrollableTabView tabBarPosition="overlayBottom" renderTabBar={() => <TabBar/>} prerenderingSiblingsNumber={1}>
            <HomeView tabLabel="Polygons" navigator={navigator} state={this.state}/>
            <PolyhedraView tabLabel="Polyhedra" navigator={navigator} state={this.state}/>
            <BadgesView tabLabel="Badges" navigator={navigator} state={this.state}/>
            <AboutView tabLabel="More" navigator={navigator}/>
          </ScrollableTabView>
        </Image>;
      case 'Polyhedron':
        return <PolyhedronView navigator={navigator} state={this.state}
                               polyhedron={route.polyhedron}/>;
      case 'Camera':
        return <CameraView navigator={navigator} state={this.state}/>;
      case 'Share':
        return <ShareView navigator={navigator} state={this.state}/>;
      case 'Puzzle':
        return <PuzzleView navigator={navigator} state={this.state}/>;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <Navigator style={{flex: 1}} initialRoute={{ name: 'Main' }}
                   renderScene={this.renderScene.bind(this)}/>
        <PolygonModal ref={'polygonModal'}/>
        <PolyhedronModal ref={'polyhedronModal'}/>
        <BadgeModal ref={'badgeModal'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null
  }
});
