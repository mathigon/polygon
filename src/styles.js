// -----------------------------------------------------------------------------
// Polygon App - Global Shared Styles
// @author Philipp Legner
// -----------------------------------------------------------------------------


import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
  scrollView: {
    alignItems: 'center'
  },
  dynamicView: {
    flex: 1,
    width: null,
    height: null
  },
  view: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 60,
  },


  // Typography

  title: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Avenir-Book'
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book'
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Avenir-Book'
  },


  // Tile Grid

  grid: {
    alignItems: 'center',  // remove?
    justifyContent: 'center',
    flexGrow: 1,  // remove?
    flexDirection: 'row',  // remove?
    flexWrap: 'wrap',
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
    fontFamily: 'Avenir-Book'
  },


  // List

  rowWrap: {
    flexGrow: 1
  },
  row: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    flexGrow: 1
  }

});
