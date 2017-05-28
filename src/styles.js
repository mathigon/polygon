// -----------------------------------------------------------------------------
// Polygon App - Global Shared Styles
// @author Philipp Legner
// -----------------------------------------------------------------------------


import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  navBarTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir-Book'
  },
  grid: {
    alignItems: 'center',
    paddingBottom: 60,
    justifyContent: 'center',
    flexGrow: 1
  },

  rowTarget: {
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
  },

  tileGrid: {

  },
  tile: {
    width: 90,
    height: 110,
    margin: 10
  },
  tileImage: {
    width: 90,
    height: 90,
  },
  tileLabel: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir-Book'
  }
});
