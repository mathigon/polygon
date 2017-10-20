// -----------------------------------------------------------------------------
// Polygon App - Global Shared Styles
// @author Philipp Legner
// -----------------------------------------------------------------------------


import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
  view: {
    paddingTop: 10,
    paddingBottom: 60
  },
  dynamicView: {
    flex: 1,
    width: null,
    height: null
  },


  // Typography

  title: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    backgroundColor:'rgba(0,0,0,0)'
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Heavy',
    backgroundColor:'rgba(0,0,0,0)'
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AvenirLTStd-Roman',
    backgroundColor:'rgba(0,0,0,0)'
  },


  // Tile Grid

  grid: {
    alignItems: 'center',  // remove?
    justifyContent: 'center',
    flexGrow: 1,  // remove?
    flexDirection: 'row',  // remove?
    flexWrap: 'wrap',
    marginBottom: 20
  },
  tileWrap: {
    alignItems: 'center',
    margin: 8,
    width: 100
  },
  tile: {
    alignItems: 'center',
  },
  tileLabel: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'AvenirLTStd-Roman',
    backgroundColor:'rgba(0,0,0,0)'
  },


  // List

  rowWrap: {
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    marginLeft: 18,
    marginRight: 18,
    flexGrow: 1
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    flexGrow: 1,
    marginLeft: -18,
    marginRight: -18,
    paddingLeft: 18,
    paddingRight: 18
  }

});
