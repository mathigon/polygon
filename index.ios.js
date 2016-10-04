import React, { Component } from 'react';
import { AppRegistry, Image, ListView, TouchableHighlight, Text, TabBarIOS, StyleSheet, View } from 'react-native';


class Polygon extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      selectedTab: 'polygons',
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8'])
    };
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var imgSource = {
      uri: 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png'
    };
    return (
        <TouchableHighlight underlayColor='rgba(0,0,0,0)'>
          <View>
            <View style={styles.row}>
              <Image style={styles.thumb} source={imgSource} />
              <Text style={styles.text}>{rowData}</Text>
            </View>
          </View>
        </TouchableHighlight>
    );
  }

  _renderContent(title: string) {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.tabText}>{title}</Text>
        <ListView contentContainerStyle={styles.list}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}/>
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
          selected={this.state.selectedTab === 'polygons'}
          onPress={() => { this.setState({ selectedTab: 'polygons' }); }}>
          {this._renderContent('Polygons')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="featured"
          title="Polyhedra"
          title="More"
          selected={this.state.selectedTab === 'polyhedra'}
          onPress={() => { this.setState({ selectedTab: 'polyhedra' }); }}>
          {this._renderContent('Polyhedra')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00c'
  },
  tabText: {
    color: 'white',
    margin: 50
  }
});

AppRegistry.registerComponent('Polygon', () => Polygon);
