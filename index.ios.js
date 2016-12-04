import React, { Component } from 'react';
import { AppRegistry, Image, ListView, StatusBar, ScrollView, Navigator, TouchableHighlight,
  TouchableOpacity, Vibration, Text, TabBarIOS, View, AsyncStorage } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Svg, { Polygon } from 'react-native-svg';
import Camera from 'react-native-camera';
import Modal from 'react-native-modalbox';

import styles from './styles.js'

const POLYGONS = require('./data/polygons.json');
const POLYHEDRA = require('./data/polyhedra.json');


// ----------------------------------------------------------------------------
// Main View

class PolygonGrid extends Component {

  render() {
    let polygons = [];
    for (let p of POLYGONS) {
      let count = this.props.shapes[p.key].length;
      polygons.push(<View style={styles.shapeTile} key={p.key}>
        <Svg height="60" width="60">
          <Polygon points={p.points} fill={p.color}/>
        </Svg>
        <Text style={styles.shapeLabel}>{p.name}s</Text>
        <View style={styles.bade}><Text style={styles.badgeText}>{count}</Text></View>
      </View>);
    }

    return (<View style={styles.shapeView}>
      <Image style={styles.logo} source={require('./images/logo.png')}/>
      <Text style={styles.shapeGridTitle}>Shapes you've collected</Text>
      <View style={styles.shapeGrid}>{polygons}</View>
      <Text style={styles.shapeGridTitle}>Add more shapes</Text>
      <View style={styles.addButtons}>
        <TouchableHighlight style={styles.addButton} onPress={() => { this.props.navigator.push({name: 'Camera'}) }}><View/></TouchableHighlight>
        <TouchableHighlight style={styles.addButton}><View/></TouchableHighlight>
        <TouchableHighlight style={styles.addButton} onPress={() => { this.props.addShape('s-3-' + Math.random()); }}><View/></TouchableHighlight>
      </View>
    </View>);
  }
}

class PolyhedraGrid extends Component {
  goToView(p) {
    this.props.navigator.push({name: 'PolyhedronDetail', polyhedron: p});
  }

  renderGrid(polyhedra) {
    let result = [];
    for (let p of polyhedra) {
      result.push(
        <TouchableHighlight style={styles.shapeTile} key={p.key} onPress={() => { this.goToView(p) }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image style={{width: 60, height: 60, backgroundColor: '#c00'}}/>
            <Text style={styles.shapeLabel}>{p.name}</Text>
          </View>
        </TouchableHighlight>);
    }
    return result;
  }

  render() {
    return (<ScrollView contentContainerStyle={styles.shapeView}>
      <Text style={styles.shapeGridTitle}>Platonic Solids</Text>
      <View style={styles.shapeGrid}>{this.renderGrid(POLYHEDRA.platonic)}</View>
      <Text style={styles.shapeGridTitle}>Archimedean Solids</Text>
      <View style={styles.shapeGrid}>{this.renderGrid(POLYHEDRA.archimedean)}</View>
    </ScrollView>);
  }
}

class TabBar extends Component {

  renderTab(name, page, isTabActive, onPressHandler) {
    return <TouchableOpacity style={{flex: 1 }} key={name} onPress={() => onPressHandler(page)}>
      <View style={[styles.tab, {opacity: isTabActive ? 1 : 0.5}]}>
        <View style={styles.tabIcon}/>
        <Text style={styles.tabText}>{name}</Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          return this.renderTab(name, page, isTabActive, this.props.goToPage);
        })}
      </View>
    );
  }

}

class MainView extends Component {
  render() {
    return (
      <ScrollableTabView tabBarPosition="bottom" renderTabBar={() => <TabBar/>} prerenderingSiblingsNumber={1}>
        <PolygonGrid tabLabel="Polygons" navigator={this.props.navigator} addShape={this.props.addShape} shapes={this.props.shapes}/>
        <PolyhedraGrid tabLabel="Polyhedra" navigator={this.props.navigator} shapes={this.props.shapes}/>
      </ScrollableTabView>)
  }
}


// ----------------------------------------------------------------------------
// Polyhedron Detail View

class PolyhedronDetailView extends Component {
  render() {
    return (
      <ScrollView>
        <TouchableHighlight onPress={() => { this.props.navigator.pop(); }}><Text>Back</Text></TouchableHighlight>
        <Text>{this.props.polyhedron.name}</Text>
      </ScrollView>)
  }
}


// ----------------------------------------------------------------------------
// Collection Views

class CameraView extends Component {

  onBarCodeRead(result) {
    let _this = this;

    setTimeout(function() {
      Vibration.vibrate();
      _this.props.navigator.pop();
      _this.props.addShape(result.data);
    }, 1000);
  }

  render() {
    return (<View style={styles.camera}>

      <Camera onBarCodeRead={x => { this.onBarCodeRead(x); }} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
        <TouchableOpacity onPress={() => { this.props.navigator.pop(); }}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </Camera>

    </View>)
  }
}


// ----------------------------------------------------------------------------
// Application

class PolygonApp extends Component {

  constructor(props) {
    super();
    let shapes = {};
    for (let p of POLYGONS) shapes[p.key] = [''];
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
      this.updateState({shapes, modalPolygon: polygon});
      this.refs.polygonModal.open();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator style={styles.app} initialRoute={{ name: 'Main' }} renderScene={(route, navigator) => {
          if (route.name == 'Main') {
          return <MainView navigator={navigator} addShape={shape => {this.addShape(shape)}} shapes={this.state.shapes}/>
        }
          if (route.name == 'PolyhedronDetail') {
          return <PolyhedronDetailView navigator={navigator} polyhedron="{route.p}" shapes={this.state.shapes}/>
        }
          if (route.name == 'Camera') {
          return <CameraView navigator={navigator} addShape={shape => {this.addShape(shape)}}/>
        }
        }}/>

        <Modal style={styles.modal} position={'center'} ref={'polygonModal'}>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>You've added a new {this.state.modalPolygon.name} to your library!</Text>
            <Svg height="60" width="60"><Polygon points={this.state.modalPolygon.points} fill={this.state.modalPolygon.color}/></Svg>
          </View>
        </Modal>
      </View>
    );
  }
}

AppRegistry.registerComponent('Polygon', () => PolygonApp);
