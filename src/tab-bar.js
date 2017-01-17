// -----------------------------------------------------------------------------
// Polygon App - Tab Bar Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { BlurView } from 'react-native-blur';


const IMAGES = [require('../images/icons/polygons.png'),
  require('../images/icons/polyhedra.png')];

const ACTIVE_IMAGES = [require('../images/icons/polygons-active.png'),
  require('../images/icons/polyhedra-active.png')];


export class TabBar extends Component {

  renderTab(name, page, isTabActive, onPressHandler) {
    let images = isTabActive ? ACTIVE_IMAGES : IMAGES;
    return <TouchableOpacity style={{flex: 1 }} key={name} onPress={() => onPressHandler(page)}>
      <View style={[styles.tab, {opacity: isTabActive ? 1 : 0.5}]}>
        <Image style={styles.tabIcon} source={images[page]}/>
        <Text style={styles.tabText}>{name}</Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    return (
      <BlurView blurType="dark" blurAmount={2} style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          return this.renderTab(name, page, isTabActive, this.props.goToPage);
        })}
      </BlurView>
    );
  }

}


const styles = StyleSheet.create({
  tabs: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 48,
    height: 36
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Avenir-Book'
  }
});
