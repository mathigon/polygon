// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { NavBar } from '../components/navbar';


export class AboutView extends Component {

  render() {
    return (<View>
      <NavBar title="More"/>
      <ScrollView contentContainerStyle={styles.view}/>
    </View>);
  }
}


const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  }
});
