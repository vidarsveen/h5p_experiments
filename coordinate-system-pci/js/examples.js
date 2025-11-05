/**
 * Example Configurations for Interactive Coordinate System
 */

const EXAMPLES = {
    basic: {
        name: "Basic Point",
        description: "Simple draggable point with validation",
        config: {
            viewport: {
                xMin: -5,
                xMax: 5,
                yMin: -5,
                yMax: 5
            },
            grid: {
                show: true
            },
            axes: {
                show: true
            },
            elements: [
                {
                    type: "point",
                    id: "pointA",
                    position: [2, 3],
                    label: "A",
                    color: "#4CAF50",
                    draggable: {
                        enabled: true,
                        snap: {
                            enabled: true,
                            type: "grid",
                            tolerance: 1
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "rule1",
                        type: "pointPosition",
                        pointId: "pointA",
                        target: [3, 4],
                        tolerance: 0.2,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Perfect! Point A is at (3, 4).",
                            incorrect: "Try moving point A to (3, 4)."
                        }
                    }
                ]
            }
        }
    },

    function: {
        name: "Function Plot",
        description: "Plot mathematical functions with draggable point",
        config: {
            viewport: {
                xMin: -10,
                xMax: 10,
                yMin: -10,
                yMax: 10
            },
            grid: {
                show: true
            },
            axes: {
                show: true
            },
            elements: [
                {
                    type: "function",
                    id: "parabola",
                    expression: "x^2 - 4",
                    color: "#2196F3",
                    thickness: 3,
                    domain: [-10, 10],
                    samples: 200
                },
                {
                    type: "function",
                    id: "sine",
                    expression: "3*sin(x)",
                    color: "#FF5722",
                    thickness: 2,
                    domain: [-10, 10],
                    samples: 300
                },
                {
                    type: "point",
                    id: "vertex",
                    position: [0, -4],
                    label: "Vertex",
                    color: "#4CAF50",
                    draggable: {
                        enabled: true,
                        snap: {
                            enabled: true,
                            type: "grid",
                            tolerance: 0.5
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "vertexCheck",
                        type: "pointPosition",
                        pointId: "vertex",
                        target: [0, -4],
                        tolerance: 0.3,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Correct! The vertex of y = x² - 4 is at (0, -4).",
                            incorrect: "The vertex of a parabola y = x² - c is at (0, -c)."
                        }
                    }
                ]
            }
        }
    },

    polygon: {
        name: "Polygon",
        description: "Geometric shapes with interactive points",
        config: {
            viewport: {
                xMin: -6,
                xMax: 6,
                yMin: -6,
                yMax: 6
            },
            grid: {
                show: true
            },
            axes: {
                show: true
            },
            elements: [
                {
                    type: "polygon",
                    id: "triangle",
                    vertices: [
                        [0, 3],
                        [-3, -2],
                        [3, -2]
                    ],
                    fill: {
                        color: "#FF5722",
                        opacity: 0.3
                    },
                    stroke: {
                        color: "#D32F2F",
                        thickness: 2
                    }
                },
                {
                    type: "circle",
                    id: "incircle",
                    center: [0, 0],
                    radius: 1.5,
                    fill: {
                        color: "#2196F3",
                        opacity: 0.2
                    },
                    stroke: {
                        color: "#1976D2",
                        thickness: 2
                    }
                },
                {
                    type: "point",
                    id: "centroid",
                    position: [0, 0],
                    label: "C",
                    color: "#4CAF50",
                    draggable: {
                        enabled: true,
                        constraints: {
                            type: "bounds",
                            bounds: {
                                xMin: -3,
                                xMax: 3,
                                yMin: -3,
                                yMax: 3
                            }
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "centroidCheck",
                        type: "pointPosition",
                        pointId: "centroid",
                        target: [0, -0.33],
                        tolerance: 0.5,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Close! The centroid is near the center of the triangle.",
                            incorrect: "The centroid is the average of the three vertices."
                        }
                    }
                ]
            }
        }
    },

    complete: {
        name: "Complete Example",
        description: "All element types: functions, shapes, and points",
        config: {
            viewport: {
                xMin: -8,
                xMax: 8,
                yMin: -6,
                yMax: 6
            },
            grid: {
                show: true
            },
            axes: {
                show: true
            },
            elements: [
                // Function
                {
                    type: "function",
                    id: "sine",
                    expression: "2*sin(x)",
                    color: "#2196F3",
                    thickness: 2,
                    domain: [-8, 8],
                    samples: 250
                },
                // Polygon (square)
                {
                    type: "polygon",
                    id: "square",
                    vertices: [
                        [-4, 4],
                        [-2, 4],
                        [-2, 2],
                        [-4, 2]
                    ],
                    fill: {
                        color: "#9C27B0",
                        opacity: 0.3
                    },
                    stroke: {
                        color: "#7B1FA2",
                        thickness: 2
                    }
                },
                // Circle
                {
                    type: "circle",
                    id: "circle",
                    center: [4, 3],
                    radius: 1.5,
                    fill: {
                        color: "#FF9800",
                        opacity: 0.3
                    },
                    stroke: {
                        color: "#F57C00",
                        thickness: 2
                    }
                },
                // Line
                {
                    type: "line",
                    id: "diagonal",
                    start: [-6, -4],
                    end: [6, 4],
                    color: "#FF5722",
                    thickness: 2
                },
                // Points
                {
                    type: "point",
                    id: "pointA",
                    position: [0, 2],
                    label: "A",
                    color: "#4CAF50",
                    draggable: {
                        enabled: true,
                        snap: {
                            enabled: true,
                            type: "grid",
                            tolerance: 0.5
                        }
                    }
                },
                {
                    type: "point",
                    id: "pointB",
                    position: [3, -2],
                    label: "B",
                    color: "#E91E63",
                    draggable: {
                        enabled: true,
                        snap: {
                            enabled: true,
                            type: "grid",
                            tolerance: 0.5
                        }
                    }
                },
                {
                    type: "point",
                    id: "pointC",
                    position: [-3, 0],
                    label: "C",
                    color: "#00BCD4",
                    draggable: {
                        enabled: true,
                        constraints: {
                            type: "bounds",
                            bounds: {
                                xMin: -5,
                                xMax: -1,
                                yMin: -2,
                                yMax: 2
                            }
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "pointACheck",
                        type: "pointPosition",
                        pointId: "pointA",
                        target: [0, 0],
                        tolerance: 0.3,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Point A is at the origin!",
                            incorrect: "Try moving point A to the origin (0, 0)."
                        }
                    },
                    {
                        id: "pointBCheck",
                        type: "pointPosition",
                        pointId: "pointB",
                        target: [3.14, 0],
                        tolerance: 0.5,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Point B is near π on the x-axis!",
                            incorrect: "Try moving point B to approximately (π, 0)."
                        }
                    }
                ]
            }
        }
    }
};
