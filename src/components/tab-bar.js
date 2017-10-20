// -----------------------------------------------------------------------------
// Polygon App - Tab Bar Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, Image } from 'react-native';
// import { BlurView } from 'react-native-blur';


const IMAGES = [
  require('../../images/icons/tab1-active.png'),
  require('../../images/icons/tab2-active.png'),
  require('../../images/icons/tab3-active.png'),
  require('../../images/icons/tab4-active.png')
];


export class TabBar extends Component {

  renderTab(name, page, isTabActive, onPressHandler) {
    return <TouchableWithoutFeedback style={{flex: 1 }} key={name} onPress={() => onPressHandler(page)}>
      <View style={[styles.tab, {opacity: isTabActive ? 1 : 0.4}]}>
        <Image style={styles.tabIcon} source={IMAGES[page]}/>
        <Text style={styles.tabText}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>;
  }

  render() {
    return (
      <View blurType="dark" blurAmount={12} style={[this.props.style, styles.tabs]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          return this.renderTab(name, page, isTabActive, this.props.goToPage);
        })}
      </View>
    );
  }

}


const styles = StyleSheet.create({
  tabs: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2E3E'
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
    marginTop: 2,
    backgroundColor:'rgba(0,0,0,0)'
  }
});
