// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { NavBar } from '../components/navbar';

import BADGES from '../../data/badges.js';
import BADGE_IMAGES from '../../images/badges/badges.js';
import BADGE_INACTIVE_IMAGES from '../../images/badges-bw/badges.js';


export class BadgesView extends Component {

  renderActiveBadge(b) {
    return <TouchableOpacity style={styles.badgeRowWrap} key={b.key}
                      onPress={() => { this.props.modal.open(b) }}>
      <View style={styles.badgeRow}>
        <Image source={BADGE_IMAGES[b.key]} style={styles.badgeIcon}/>
        <View style={styles.badgeText}>
          <Text style={styles.badgeTitle}>{b.name}</Text>
          <Text style={styles.badgeDescription}>{b.description}</Text>
        </View>
      </View>
    </TouchableOpacity>;
  }

  renderInactiveBadge(b) {
    return <View key={b.key} style={[styles.badgeRowWrap, styles.badgeRow]}>
      <Image source={BADGE_INACTIVE_IMAGES[b.key]} style={[styles.badgeIcon, {opacity: .8}]}/>
      <View style={styles.badgeText}>
        <Text style={styles.badgeTitle}>{b.name}</Text>
        <Text style={styles.badgeDescription}>{b.description}</Text>
      </View>
    </View>;
  }

  render() {
    let badges = [];
    for (let b of BADGES) {
      let isActive = this.props.state.badges.includes(b.key);
      let row = isActive ? this.renderActiveBadge(b) : this.renderInactiveBadge(b);
      badges.push(row);
    }

    return (<View style={{flex: 1}}>
      <NavBar title="Badges"/>
      <ScrollView contentContainerStyle={styles.view}>
        <View style={{flex: 1, paddingTop: 10, paddingBottom: 60}}>{badges}</View>
      </ScrollView>
    </View>);
  }

}


const styles = StyleSheet.create({
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  badgeRowWrap: {
    height: 91,
    flexGrow: 1
  },
  badgeRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    flexGrow: 1
  },
  badgeIcon: {
    width: 60,
    height: 70,
    marginRight: 20
  },
  badgeText: {
    flexGrow: 1
  },
  badgeTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Avenir-Book'
  },
  badgeDescription: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Avenir-Book'
  }
});
