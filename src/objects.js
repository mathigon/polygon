// -----------------------------------------------------------------------------
// Polygon - Object Classes
// @author Philipp Legner
// -----------------------------------------------------------------------------


const POLYGONS = require('../data/polygons.json');
const POLYHEDRA = require('../data/polyhedra.json');
import POWERUPS from '../data/powerups';
import BADGES from '../data/badges';

// -----------------------------------------------------------------------------

class Polygon {
  constructor(data) {
    this.name = data.name;
    this.key = data.key;
    this.points = data.points;
    this.color = data.color;
  }

  getCount(state) {
    let n = 1 + state.shapes[this.key].length;

    // Reverse order, so that *3 is run last.
    for (let i=powerups.length; i>0; --i) {
      const p = powerups[i - 1];
      if (state.powerups.includes(p.key)) n = p.modifier(+this.key, n) || n;
    }

    return n;
  }
}

export const polygons = POLYGONS.map(p => new Polygon(p));

const polygonMap = {};
for (let p of polygons) polygonMap[p.key] = p;

// -----------------------------------------------------------------------------

class Polyhedron {
  constructor(data) {
    this.name = data.name;
    this.shortName = data.shortName || data.name;
    this.description = data.description || '';

    this.key = data.key;

    this.faces = data.faces;
    this.vertices = data.vertices;
    this.edges = data.faces + data.vertices - 1;

    this.total = Object.keys(this.faces).reduce((t, s) => t + this.faces[s], 0);

    this.netSize = data.netSize || [330, 120];
    this.net = data.net || {};
  }

  progress(state) {
    let collected = 0;
    for (let s of Object.keys(this.faces)) {
      collected += Math.min(polygonMap[s].getCount(state), this.faces[s]);
    }
    return collected / this.total;
  }

  completed(state) {
    return this.progress(state) >= 1;
  }
}

export const platonicSolids = POLYHEDRA.platonic.map(p => new Polyhedron(p));
export const archimedeanSolids = POLYHEDRA.archimedean.map(p => new Polyhedron(p));
export const polyhedra = [...platonicSolids, ...archimedeanSolids];

// -----------------------------------------------------------------------------

export const badges = BADGES;
export const powerups = POWERUPS;
