// -----------------------------------------------------------------------------
// Polygon App - Nav Bar Class
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import NavigationBar from 'react-native-navbar';

import BACK_ICON from '../../images/icons/back.png';


export class NavBar extends Component {
  render() {
    const title = {title: this.props.title, style: styles.title};
    const color = this.props.color || '#1F2E3E';

    if (!this.props.navigator) {
      return <NavigationBar title={title} tintColor={color}
                            statusBar={{style: 'light-content'}}/>;
    }

    const back = <TouchableWithoutFeedback onPress={() => this.props.navigator.pop()}>
      <Image source={BACK_ICON} style={styles.back} resizeMode="cover"/>
    </TouchableWithoutFeedback>;

    return <NavigationBar title={title} leftButton={back} tintColor={color}
                          statusBar={{style: 'light-content'}}/>;
  }
}

const styles = StyleSheet.create({
  back: {
    width: 44,
    height: 44
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir-Book'
  }
});
