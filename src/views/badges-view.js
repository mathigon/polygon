// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

const BADGES = require('../../data/badges.json');


export class BadgesView extends Component {

  render() {
    let badges = [];
    for (let b of BADGES) {
      badges.push(
        <TouchableHighlight style={styles.badgeRowWrap} key={b.name}>
          <View style={styles.badgeRow}>
            <View style={styles.badgeIcon}/>
            <View style={styles.badgeText}>
              <Text style={styles.badgeTitle}>{b.name}</Text>
              <Text style={styles.badgeDescription}>{b.description}</Text>
            </View>
          </View>
        </TouchableHighlight>);
    }

    return (<View>
      <NavigationBar title={{title: 'Badges', style: styles.title}} statusBar={{style: 'light-content'}} tintColor='#1F2E3E'/>
      <ScrollView contentContainerStyle={styles.view}>{badges}</ScrollView>
    </View>);
  }

}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir-Book'
  },
  grid: {
    alignItems: 'center',
    paddingBottom: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },

  badgeRowWrap: {
    height: 81,
    flexGrow: 1
  },
  badgeRow: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    flexGrow: 1
  },
  badgeIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#c00',
    borderRadius: 30,
    marginRight: 10
  },
  badgeText: {
    flexGrow: 1
  },
  badgeTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Avenir-Book'
  },
  badgeDescription: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Avenir-Book'
  }
});
