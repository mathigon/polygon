export default [
  {
    key: "1",
    name: "Three-way mirror",
    description: "Every triangle you collect counts as three.",
    question: "How many Platonic solids are there?",
    answer: 5,
    modifier(shape, n) { if (shape === 3) return n * 3; }
  }, {
    key: "2",
    name: "Four walls",
    description: "Get four additional squares.",
    question: "How many vertices does the icosahedron have?",
    answer: 12,
    modifier(shape, n) { if (shape === 4) return n + 4; }
  }, {
    key: "3",
    name: "Pentagram",
    description: "Get five additional pentagons.",
    question: "Which Platonic solid consists of pentagons?",
    answer: 'dodecahedron',
    modifier(shape, n) { if (shape === 5) return n + 5; }
  }, {
    key: "4",
    name: "Six times six",
    description: "Get 6 additional hexagons.",
    question: "How many Platonic solids consist of triangles?",
    answer: 3,
    modifier(shape, n) { if (shape === 6) return n + 6; }
  }, {
    key: "5",
    name: "Three, four, five (Part 1)",
    description: "Get 3 additional squares and pentagons.",
    question: "How many Archimedean solids are there?",
    answer: 13,
    modifier(shape, n) { if (shape === 4 || shape === 5) return n + 3; }
  }, {
    key: "6",
    name: "Three, four, five (Part 2)",
    description: "Get 5 additional triangles and squares.",
    question: "According to Plato, which polyhedron was the building block of fire?",
    answer: 'tetrahedron',
    modifier(shape, n) { if (shape === 3 || shape === 4) return n + 5; }
  }, {
    key: "7",
    name: "Octagonal",
    description: "Get 3 additional octagons.",
    question: "What is the volume of a cube with side length 2?",
    answer: 8,
    modifier(shape, n) { if (shape === 8) return n + 3; }
  }, {
    key: "8",
    name: "Pieces of eight",
    description: "Get 4 additional triangles and hexagons.",
    question: "How many faces does the Snub Dodecahedron have?",
    answer: 92,
    modifier(shape, n) { if (shape === 3 || shape === 6) return n + 4; }
  }, {
    key: "9",
    name: "Four, five, six",
    description: "Get 5 additional squares and hexagons.",
    question: "What Archimedean Solid has the shape of a soccer ball?",
    answer: 'truncated icosahedron',
    modifier(shape, n) { if (shape === 4 || shape === 6) return n + 5; }
  }, {
    key: "10",
    name: "100 corners!",
    description: "Get 10 additional 10-gons.",
    question: "Which molecule has the shape of a Truncated Icosahedron?",
    answer: 'c60',
    modifier(shape, n) { if (shape === 10) return n + 10; }
  }, {
    key: "11",
    name: "Ten more squares",
    description: "Get 10 additional squares.",
    question: "Which polyhedron is the dual of the cube?",
    answer: 'octahedron',
    modifier(shape, n) { if (shape === 4) return n + 10; }
  }, {
    key: "12",
    name: "Triangulate",
    description: "Get 9 additional triangles.",
    question: "What is the value of “Faces + Vertices – Edges” for every polyhedron?",
    answer: 2,
    modifier(shape, n) { if (shape === 3) return n + 9; }
  }
]
