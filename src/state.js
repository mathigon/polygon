// -----------------------------------------------------------------------------
// Polygon App - Main App State
// @author Philipp Legner
// -----------------------------------------------------------------------------


import { Alert, AsyncStorage } from 'react-native';
import { Polyhedra } from './components/polyhedron';
import Badges from '../data/badges';

const POLYGONS = require('../data/polygons.json');
import POWERUPS from '../data/powerups';


export class State {

  constructor(app) {
    this.shapes = {3: [''], 4: [''], 5: [''], 6: [''], 8: [''], 10: ['']};
    this.polyhedra = [];
    this.powerups = [];
    this.badges = [];

    this._app = app;

    this._loadAsync('badges');
    this._loadAsync('powerups');
    this._loadAsync('polyhedra');
    this._loadAsync('shapes');
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
      let completed = p.progress(this) >= 1;
      let previous = this.polyhedra.includes(p.key);
      if (completed && !previous) {
        this.polyhedra.push(p.key);
        this._app.refs.polyhedronModal.queue(p);
      }
    }
    AsyncStorage.setItem('polyhedra', JSON.stringify(this.polyhedra));
  }

  checkCompletedBadges() {
    for (let b of Badges) {
      if (b.validate(this) && !this.badges.includes(b.key)) {
        this.badges.push(b.key);
        this._app.refs.badgeModal.queue(b);
      }
    }
    AsyncStorage.setItem('badges', JSON.stringify(this.badges));
  }

  getShapeCount(shape) {
    let n = this.shapes[shape].length;
    for (let p of POWERUPS) {
      if (this.powerups.includes(p.key)) n = p.modifier(+shape, n) || n;
    }
    return n;
  }

  // ---------------------------------------------------------------------------

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
    this.checkCompletedBadges();
  }

  addPowerup(p) {
    this.powerups.push(p.key);
    AsyncStorage.setItem('powerups', JSON.stringify(this.powerups));

    this._app.forceUpdate();
    this.checkCompletedPolyhedra();
    this.checkCompletedBadges();
  }

}
