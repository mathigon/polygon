// -----------------------------------------------------------------------------
// Polygon App - Main App State
// @author Philipp Legner
// -----------------------------------------------------------------------------


import { Alert, AsyncStorage } from 'react-native';
import { Polyhedra } from './components/polyhedron';

const POLYGONS = require('../data/polygons.json');


export class State {

  constructor(app) {
    this.shapes = {3: [''], 4: [''], 5: [''], 6: [''], 8: [''], 10: ['']};
    this.polyhedra = [];
    this.powerups = {};

    this._app = app;

    this._loadAsync('shapes');
    this._loadAsync('polyhedra');
    this._loadAsync('powerups');
  }

  _loadAsync(key) {
    AsyncStorage.getItem(key).then(value => {
      if (!value) return;
      this[key] = JSON.parse(value);
      this._app.forceUpdate();
    }).done();
  }

  // ---------------------------------------------------------------------------

  checkCompletedPolyhedra() {
    for (let p of Polyhedra) {
      let completed = p.progress(this.shapes) >= 1;
      let previous = this.polyhedra.includes(p.name);
      if (completed && !previous) {
        this.polyhedra.push(p.name);
        this._app.refs.polyhedronModal.queue(p);
      }
    }
    AsyncStorage.setItem('polyhedra', JSON.stringify(this.polyhedra));
  }

  addShape(shape) {
    let [_, id, key] = (shape || '').split('-');
    let polygon = POLYGONS.find(p => p.key === +id);

    if (!polygon) {
      Alert.alert('Error', 'This shape couldn’t be added. Try scanning again!');
      return;
    }

    if (this.shapes[id].includes(+key)) {
      Alert.alert('Error', `You’ve already added this ${polygon.name} before!`);
      return;
    }

    this.shapes[id].push(+key);

    AsyncStorage.setItem('shapes', JSON.stringify(this.shapes));
    this._app.forceUpdate();

    this._app.refs.polygonModal.open(polygon);
    this.checkCompletedPolyhedra();
  }

  addPowerup(key) {
    // TODO
  }

}
