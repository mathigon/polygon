// -----------------------------------------------------------------------------
// Polygon - Object Classes
// @author Philipp Legner
// -----------------------------------------------------------------------------


const POLYGONS = require('../data/polygons.json');
const POLYHEDRA = require('../data/polyhedra.json');
const BADGES = require('../data/badges.json');
const POWERUPS = require('../data/powerups.json');

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

function scannedShapes(state) { return polygons.map(s => state.shapes[s.key].length); }
function totalShapes(state) { return polygons.map(p => p.getCount(state)); }
function sum(array) { return array.reduce((a, b) => a + b, 0); }

const badeValidation = {
  pythagoras: state => (sum(scannedShapes(state)) >= 9),
  fermat: state => (state.powerups.length >= 3),
  fibonacci: state => (sum(totalShapes(state)) >= 20),
  plato: state => (platonicSolids.every(p => state.polyhedra.includes(p.key))),
  euler: state => (Math.min(...scannedShapes(state)) >= 2),
  euclid: state => (Math.max(...totalShapes(state)) >= 20),
  gauss: state => (state.powerups.length >= 10),
  archimedes: state => (state.polyhedra.length >= 18)
};

class Badge {
  constructor(data) {
    this.key = data.key;
    this.name = data.name;
    this.description = data.description;
    this.bio = data.bio;
    this.validate = badeValidation[data.key];
  }
}

export const badges = BADGES.map(b => new Badge(b));

// -----------------------------------------------------------------------------

const powerupModifiers = {
  1(shape, n) { if (shape === 3) return n * 3; },
  2(shape, n) { if (shape === 4) return n + 4; },
  3(shape, n) { if (shape === 5) return n + 5; },
  4(shape, n) { if (shape === 6) return n + 6; },
  5(shape, n) { if (shape === 4 || shape === 5) return n + 3; },
  6(shape, n) { if (shape === 3 || shape === 4) return n + 5; },
  7(shape, n) { if (shape === 8) return n + 3; },
  8(shape, n) { if (shape === 3 || shape === 6) return n + 4; },
  9(shape, n) { if (shape === 4 || shape === 6) return n + 5; },
  10(shape, n) { if (shape === 10) return n + 10; },
  11(shape, n) { if (shape === 4) return n + 10; },
  12(shape, n) { if (shape === 3) return n + 9; }
};

class Powerup {
  constructor(data) {
    this.key = data.key;
    this.name = data.name;
    this.description = data.description;
    this.question = data.question;
    this.answer = data.answer;
    this.modifier = powerupModifiers[data.key];
  }
}

export const powerups = POWERUPS.map(b => new Powerup(b));
