// -----------------------------------------------------------------------------
// Polygon App - Main App View
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Navigator, View, AsyncStorage, Image, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const POLYGONS = require('../data/polygons.json');
const BACKGROUND = require('../images/background.jpg');

import { PolygonListView, PolyhedronListView } from './list-views.js'
import { CameraView } from './shape-collection-views.js'
import { PolyhedronView } from './polyhedron-view.js'
import { TabBar } from './tab-bar.js'
import { PolygonModal } from './modals.js'


export class App extends Component {

  constructor() {
    super();
    let shapes = {"3": ['', '', '', '', '', '', '', ''],
                  "4": ['', '', '', '', '', ''],
                  "5": [''], "6": [''], "8": [''], "10": ['']};
    this.state = {shapes, modalPolygon: {}}
  }

  componentDidMount() {
    AsyncStorage.getItem('shapes').then(value => {
      if (value) this.updateState({shapes: JSON.parse(value)});
    }).done();
  }

  updateState(newState) {
    for (let key of Object.keys(newState)) this.state[key] = newState[key];
    this.setState(this.state);
  }

  addShape(id) {
    let key = +id.split('-')[1];
    let shapes = this.state.shapes;
    if (shapes[key].indexOf(id) < 0) {
      shapes[key].push(id);
      AsyncStorage.setItem('shapes', JSON.stringify(shapes));
      let polygon = POLYGONS.find(p => p.key == key);
      this.updateState({ shapes, modalPolygon: polygon });
      this.refs.polygonModal.open();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <Navigator style={{flex: 1}} initialRoute={{ name: 'Main' }} renderScene={(route, navigator) => {
          if (route.name == 'Main') {
            return <Image source={BACKGROUND} style={{flex: 1, width: null, height: null}} resizeMode="cover">
              <ScrollableTabView tabBarPosition="overlayBottom" renderTabBar={() => <TabBar/>} prerenderingSiblingsNumber={1}>
                <PolygonListView tabLabel="Polygons" navigator={navigator} addShape={shape => {this.addShape(shape)}} shapes={this.state.shapes}/>
                <PolyhedronListView tabLabel="Polyhedra" navigator={navigator} shapes={this.state.shapes}/>
              </ScrollableTabView>
            </Image>
          }
          if (route.name == 'PolyhedronDetail') {
            return <PolyhedronView navigator={navigator} polyhedron={route.polyhedron} shapes={this.state.shapes}/>
          }
          if (route.name == 'Camera') {
            return <CameraView navigator={navigator} addShape={shape => {this.addShape(shape)}}/>
          }
        }}/>
        <PolygonModal polygon={this.state.modalPolygon} ref={'polygonModal'}/>
      </View>
    );
  }
}


