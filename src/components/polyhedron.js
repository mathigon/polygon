// -----------------------------------------------------------------------------
// Polygon App - Polyhedron Class
// @author Philipp Legner
// -----------------------------------------------------------------------------


const POLYHEDRA = require('../../data/polyhedra.json');

class Polyhedron {
  constructor(data) {
    this.name = data.name;
    this.shortName = data.shortName || data.name;
    this.description = data.description || '';

    this.key = data.key;

    this.faces = data.faces;
    this.vertices = data.vertices;
    this.total = Object.keys(this.faces).reduce((t, s) => t + this.faces[s], 0);

    this.netSize = data.netSize || [330, 120];
    this.net = data.net || {};
  }

  progress(shapes) {
    let collected = 0;
    for (let s of Object.keys(this.faces)) {
      collected += Math.min(shapes[s].length, this.faces[s]);
    }
    return collected / this.total;
  }
}

export const PlatonicSolids = POLYHEDRA.platonic.map(p => new Polyhedron(p));
export const ArchimedeanSolids = POLYHEDRA.archimedean.map(p => new Polyhedron(p));
