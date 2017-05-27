// -----------------------------------------------------------------------------
// Polygon App - Tab Bar Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { BlurView } from 'react-native-blur';


const IMAGES = [
  require('../../images/icons/tab1.png'),
  require('../../images/icons/tab2.png'),
  require('../../images/icons/tab3.png'),
  require('../../images/icons/tab4.png')
];

const ACTIVE_IMAGES = [
  require('../../images/icons/tab1-active.png'),
  require('../../images/icons/tab2-active.png'),
  require('../../images/icons/tab3-active.png'),
  require('../../images/icons/tab4-active.png')
];


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
      <BlurView blurType="dark" blurAmount={12} style={[this.props.style, styles.tabs]}>
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
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 32,
    height: 24
  },
  tabText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Avenir-Book',
    marginTop: 2
  }
});
