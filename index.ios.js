import React, { Component } from 'react';
import { AppRegistry, Text, TabBarIOS, StyleSheet, View } from 'react-native';

class Polygon extends Component {
  state = {
    selectedTab: 'polygons'
  };

  _renderContent(title: string) {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.tabText}>{title}</Text>
      </View>
    );
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="rgba(255,255,255,0.5)"
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          systemIcon="bookmarks"
          title="Polygons"
          badge="5"
          selected={this.state.selectedTab === 'polygons'}
          onPress={() => { this.setState({ selectedTab: 'polygons' }); }}>
          {this._renderContent('Polygons')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="featured"
          title="Polyhedra"
          title="More"
          selected={this.state.selectedTab === 'polyhedra'}
          onPress={() => { this.setState({ selectedTab: 'polyhedra' }); }}>
          {this._renderContent('Polyhedra')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00c'
  },
  tabText: {
    color: 'white',
    margin: 50
  }
});

AppRegistry.registerComponent('Polygon', () => Polygon);
