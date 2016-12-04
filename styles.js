import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#21C',
  },
  logo: {
    width: 295,
    height: 60,
    marginTop: 30
  },

  shapeView: {
    alignItems: 'center',
  },
  shapeGridTitle: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  shapeGrid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shapeTile: {
    margin: 10,
    width: 100,
    height: 100,
    alignItems: 'center'
  },
  shapeLabel: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },

  addButtons: {
    flexDirection: 'row'
  },
  addButton: {
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 30
  },

  bade: {
    position: 'absolute',
    top: 1,
    right: 14,
    width: 24,
    height: 24,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#d00',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },

  camera: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },

  tabs: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#006'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#c00'
  },
  tabText: {
    color: '#fff'
  },

  modal: {
    height: 200,
    backgroundColor: 'transparent'
  },
  modalBody: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#eee",
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 10
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  }

});
