// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';

import BADGES from '../../data/badges.js';
import BADGE_IMAGES from '../../images/badges/badges.js';
import BADGE_INACTIVE_IMAGES from '../../images/badges-bw/badges.js';


export class BadgesView extends Component {

  renderActiveBadge(b) {
    return <TouchableOpacity style={[baseStyles.rowWrap, {height: 91}]} key={b.key}
                      onPress={() => { this.props.modal.open(b) }}>
      <View style={baseStyles.row}>
        <Image source={BADGE_IMAGES[b.key]} style={styles.badgeIcon}/>
        <View style={styles.badgeText}>
          <Text style={baseStyles.heading}>{b.name}</Text>
          <Text style={baseStyles.text}>{b.description}</Text>
        </View>
      </View>
    </TouchableOpacity>;
  }

  renderInactiveBadge(b) {
    return <View key={b.key} style={[baseStyles.row,  {height: 91}]}>
      <Image source={BADGE_INACTIVE_IMAGES[b.key]} style={[styles.badgeIcon, {opacity: .8}]}/>
      <View style={styles.badgeText}>
        <Text style={baseStyles.heading}>{b.name}</Text>
        <Text style={baseStyles.text}>{b.description}</Text>
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
      <ScrollView contentContainerStyle={baseStyles.scrollView}>
        <View style={baseStyles.view}>{badges}</View>
      </ScrollView>
    </View>);
  }

}


const styles = StyleSheet.create({
  badgeIcon: {
    width: 60,
    height: 70,
    marginRight: 20
  },
  badgeText: {
    flexGrow: 1
  }
});
