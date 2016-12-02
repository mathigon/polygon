import React, { Component } from 'react';
import { AppRegistry, Image, ListView, ScrollView, Navigator, TouchableHighlight, TouchableOpacity,
  Text, TabBarIOS, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import Svg, { Polygon } from 'react-native-svg';

const POLYGONS = require('./data/polygons.json');
const POLYHEDRA = require('./data/polyhedra.json');


// ----------------------------------------------------------------------------
// Main View

class PolygonGrid extends Component {
  render() {
    let polygons = [];
    for (let p of POLYGONS) {
      polygons.push(<View style={styles.shapeTile} key={p.key}>
        <View style={styles.shapeIcon}/>
        <Text style={styles.shapeLabel}>{p.name}s</Text>
      </View>);
    }

    return (<ScrollView contentContainerStyle={styles.shapeView} tabLabel="Polygons">
      <View style={styles.shapeGrid}>{polygons}</View>
    </ScrollView>);
  }
}

class PolyhedraGrid extends Component {
  goToView(p) {
    this.props.navigator.push({name: 'PolyhedronDetail', polyhedron: p});
  }

  render() {
    let platonic = [];
    for (let p of POLYHEDRA.platonic) {
      platonic.push(<TouchableHighlight style={styles.shapeTile} key={p.key} onPress={() => { this.goToView(p) }}>
        <View>
          <View style={styles.shapeIcon}/>
          <Text style={styles.shapeLabel}>{p.name}</Text>
        </View>
      </TouchableHighlight>);
    }

    return (<ScrollView contentContainerStyle={styles.shapeView} tabLabel="Polygons">
      <Text style={styles.shapeGridTitle}>Platonic Solids</Text>
      <View style={styles.shapeGrid}>{platonic}</View>
      <Text style={styles.shapeGridTitle}>Archimedean Solids</Text>
      <View style={styles.shapeGrid}/>
    </ScrollView>);
  }
}

class MainView extends Component {
  render() {
    return (
      <ScrollableTabView tabBarPosition="bottom">
        <PolygonGrid navigator={this.props.navigator}/>
        <PolyhedraGrid navigator={this.props.navigator}/>
      </ScrollableTabView>)
  }
}


// ----------------------------------------------------------------------------
// Polyhedron Detail View

class PolyhedronDetailView extends Component {
  render() {
    return (
      <ScrollView>
        <Text>{this.props.polyhedron.name}</Text>
        <TouchableHighlight onPress={() => { this.props.navigator.pop(); }}><Text>Back</Text></TouchableHighlight>
      </ScrollView>)
  }
}


// ----------------------------------------------------------------------------
// Collection Views

class CameraDetailView extends Component {

}


// ----------------------------------------------------------------------------
// Application

function renderScene(route, navigator) {
  if (route.name == 'Main') {
    return <MainView navigator={navigator}/>
  }
  if (route.name == 'PolyhedronDetail') {
    return <PolyhedronDetailView navigator={navigator} polyhedron="{route.p}"/>
  }
  if (route.name == 'CameraDetail') {
    return <CameraDetailView navigator={navigator}/>
  }
}

class PolygonApp extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Navigator style={styles.app} initialRoute={{ name: 'Main' }} renderScene={ renderScene }/>
    );
  }
}

AppRegistry.registerComponent('Polygon', () => PolygonApp);



// ----------------------------------------------------------------------------
// Styles

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#21C',
  },
  shapeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  shapeGrid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  shapeTile: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    alignItems: 'center'
  },
  shapeIcon: {
    backgroundColor: '#c00',
    height: 60,
    width: 60
  },
  shapeLabel: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
});
