// -----------------------------------------------------------------------------
// Polygon App - Polyhedron List View Component
// @author Philipp Legner
// -----------------------------------------------------------------------------


import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Linking, ListView, TouchableHighlight, ScrollView } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view'
import { NavBar } from '../components/navbar';
import { baseStyles } from '../styles';
import { AboutPages } from '../../data/about.js';

const MOMATH = require('../../images/links/momath.png');
const MATHIGON = require('../../images/links/mathigon.png');
const IMAGINARY = require('../../images/links/imaginary.png');
import ABOUT from '../../images/about/about';


export class AboutView extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  goToView(p) {
    this.props.navigation.navigate('AboutPage', {page: p});
  }

  renderLink(name, page) {
    return <View style={baseStyles.rowWrap}>
      <TouchableHighlight style={baseStyles.row}
                          onPress={() => this.goToView(page)}
                          underlayColor='rgba(255,255,255,0.2)'>
        <Text style={[baseStyles.text, {fontSize: 16}]}>{name}</Text>
      </TouchableHighlight>
    </View>;
  }

  render() {
    return (<View style={{flex: 1}}>
      <NavBar title="More"/>
      <ScrollView contentContainerStyle={baseStyles.view}>
        {this.renderLink('Polygons and Polyhedra', 'polygons')}
        {this.renderLink('Platonic and Archimedean Solids', 'solids')}
        {this.renderLink('Help and Support', 'help')}
        {this.renderLink('Credits', 'credits')}
        <View style={styles.links}>
          <View style={styles.image} activeOpacity={0.5}
                onPress={() => Linking.openURL('https://momath.org')}>
            <Image source={MOMATH}/>
          </View>
          <View style={styles.image} activeOpacity={0.5}
                onPress={() => Linking.openURL('https://mathigon.org')}>
            <Image source={MATHIGON}/>
          </View>
          <View style={styles.image} activeOpacity={0.5}
                onPress={() => Linking.openURL('https://imaginary.org')}>
            <Image source={IMAGINARY}/>
          </View>
        </View>
      </ScrollView>
    </View>);
  }
}

const markdownRules = {
  paragraph: {
    render({content, width, height}, output, state, styles) {
      if (Array.isArray(content) && content.length === 1 && content[0].type === 'image') {
        return <View key={state.key} style={{width, height, padding: 4}}>
          <Image source={ABOUT[content[0].target]} style={{flexGrow: 1}}/>
        </View>
      }
      return <Text key={state.key} style={styles.paragraph}>
        {typeof content === 'string' ? content : output(content, state)}
      </Text>
    }
  }
};

export class AboutPageView extends Component {
  onLinkPress(url) {
    const app = this.props.screenProps.app;
    if (url === 'tutorial') app.updateState('tutorial', t => t.intro = true);
    // TODO other link clicks
  }

  render() {
    const page = AboutPages[this.props.navigation.state.params.page];

    return (<View style={{flex: 1, backgroundColor: '#061627'}}>
      <NavBar title={page.title} navigation={this.props.navigation}/>
      <ScrollView contentContainerStyle={[baseStyles.view, styles.page]}>
        <MarkdownView rules={markdownRules} styles={markdownStyles}
                      onLinkPress={url => this.onLinkPress(url)}>
          {page.body}
          </MarkdownView>
      </ScrollView>
    </View>);
  }
}


const styles = StyleSheet.create({
  links: {
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    width: 220,
    height: 64,
    margin: 10
  },
  page: {
    paddingTop: 20,
    marginTop: 0,
    paddingLeft: 28,
    paddingRight: 28
  }
});

const markdownStyles = {
  paragraph: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Avenir-Book',
    fontSize: 16
  },
  strong: {color: 'white'},
  link: {color: '#009eeb'}
};
