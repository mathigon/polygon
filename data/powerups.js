export default [
  {
    // This one is at the end, so that we multiply by 3 last!
    key: 1,
    name: "Three-way Mirror",
    description: "Every triangle you collect counts as three.",
    question: "How many Platonic solids are there?",
    answer: 5,
    modifier(shape, n) { if (shape === 3) return n * 3; }
  }, {
    key: 2,
    name: "Four walls",
    description: "Get four additional squares.",
    question: "How many Archimedean solids are there?",
    answer: 13,
    modifier(shape, n) { if (shape === 4) return n + 4; }
  }, {
    key: 3,
    name: "Pentagram",
    description: "Get five additional pentagons.",
    question: "Which Platonic solid consists of pentagons?",
    answer: 'dodecahedron',
    modifier(shape, n) { if (shape === 5) return n + 5; }
  }, {
    key: 4,
    name: "Six times six",
    description: "Get 6 additional hexagons.",
    question: "How many Platonic solids consist of triangles?",
    answer: 3,
    modifier(shape, n) { if (shape === 6) return n + 6; }
  }, {
    key: 5,
    name: "Three, Four, Five",
    description: "Get 3 additional squares and pentagons.",
    question: "Which molecule has the shape of a Truncated Icosahedron?",
    answer: 3,
    modifier(shape, n) { if (shape === 4 || shape === 5) return n + 3; }
  }, {
    key: 6,
    name: "Three, Four, Five (again)",
    description: "Get 5 additional triangles and squares.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 3 || shape === 4) return n + 5; }
  }, {
    key: 7,
    name: "***",
    description: "Get 3 additional octagons.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 8) return n + 3; }
  }, {
    key: 8,
    name: "****",
    description: "Get 4 additional triangles and hexagons.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 3 || shape === 6) return n + 4; }
  }, {
    key: 9,
    name: "Four, five, six",
    description: "Get 5 additional squares and hexagons.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 4 || shape === 6) return n + 5; }
  }, {
    key: 10,
    name: "100 corners!",
    description: "Get 10 additional 10-gons.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 10) return n + 10; }
  }, {
    key: 11,
    name: "*****",
    description: "Get 10 additional squares.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 4) return n + 10; }
  }, {
    key: 12,
    name: "Triangulate",
    description: "Get 9 additional triangles.",
    question: "?",
    answer: 3,
    modifier(shape, n) { if (shape === 3) return n + 9; }
  }
]
