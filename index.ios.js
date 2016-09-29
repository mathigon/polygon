/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, TabBarIOS, StyleSheet, View } from 'react-native';

class Polygon extends Component {
  state = {
    selectedTab: 'redTab'
  };

  _renderContent(color: string, pageText: string) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
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
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({ selectedTab: 'redTab' });
          }}>
          {this._renderContent('#783E33', 'Red Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="featured"
          title="Polyhedra"
          renderAsOriginal
          title="More"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({ selectedTab: 'greenTab' });
          }}>
          {this._renderContent('#21551C', 'Green Tab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('Polygon', () => Polygon);
