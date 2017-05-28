let shapes = [3, 4, 5, 6, 8, 10];

export default [
  {
    key: "pythagoras",
    name: "Pythagoras",
    description: "Scan three polygons.",
    bio: "",
    validate(state) { return true; /* TODO */ }
  }, {
    key: "fermat",
    name: "Fermat",
    description: "Solve three power-ups.",
    bio: "",
    validate(state) { return state.powerups >= 3; }
  }, {
    key: "fibonacci",
    name: "Fibonacci",
    description: "Share your shapes with another visitor.",
    bio: "",
    validate(state) { return false; /* TODO */ }
  }, {
    key: "plato",
    name: "Plato",
    description: "Complete all five Platonic solids.",
    bio: "",
    validate(state) { return false; /* TODO */ }
  }, {
    key: "euler",
    name: "Euler",
    description: "Scan one of each different polygon.",
    bio: "",
    validate(state) { return false; /* TODO */ }
  }, {
    key: "euclid",
    name: "Euclid",
    description: "Collect 20 copies of the same shape.",
    bio: "",
    validate(state) { return false; /* TODO */ }
  }, {
    key: "gauss",
    name: "Gauss",
    description: "Solve ten power-ups.",
    bio: "",
    validate(state) { return false; /* TODO */ }
  }, {
    key: "archimedes",
    name: "Archimedes",
    description: "Complete all 13 Archimedean solids.",
    bio: "",
    validate(state) { return false; /* TODO */ }
  }
];
