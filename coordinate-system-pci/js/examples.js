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
    },

    lineConstraint: {
        name: "Line Constraint (Phase 2)",
        description: "Point constrained to move along a line",
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
                    type: "function",
                    id: "line",
                    expression: "2*x - 1",
                    color: "#2196F3",
                    thickness: 2,
                    domain: [-5, 5],
                    samples: 100
                },
                {
                    type: "point",
                    id: "pointOnLine",
                    position: [1, 1],
                    label: "P",
                    color: "#4CAF50",
                    radius: 8,
                    draggable: {
                        enabled: true,
                        constraints: {
                            type: "line",
                            expression: "2*x - 1"
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "lineCheck",
                        type: "pointOnLine",
                        pointId: "pointOnLine",
                        lineExpression: "2*x - 1",
                        tolerance: 0.1,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Point P is on the line y = 2x - 1!",
                            incorrect: "Point P should be on the line y = 2x - 1."
                        }
                    }
                ]
            }
        }
    },

    circleConstraint: {
        name: "Circle Constraint (Phase 2)",
        description: "Point constrained to move along a circle",
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
                    type: "circle",
                    id: "circle",
                    center: [0, 0],
                    radius: 3,
                    fill: {
                        color: "#2196F3",
                        opacity: 0.1
                    },
                    stroke: {
                        color: "#1976D2",
                        thickness: 2
                    }
                },
                {
                    type: "point",
                    id: "pointOnCircle",
                    position: [3, 0],
                    label: "P",
                    color: "#4CAF50",
                    radius: 8,
                    draggable: {
                        enabled: true,
                        constraints: {
                            type: "circle",
                            center: [0, 0],
                            radius: 3
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "circleCheck",
                        type: "distance",
                        pointId1: "pointOnCircle",
                        pointId2: null,
                        fromPoint: [0, 0],
                        targetDistance: 3,
                        tolerance: 0.1,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Point P is on the circle!",
                            incorrect: "Point P should be on the circle (distance 3 from origin)."
                        }
                    }
                ]
            }
        }
    },

    distanceValidation: {
        name: "Distance Validation (Phase 2)",
        description: "Validate distance between two points",
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
                {
                    type: "point",
                    id: "pointA",
                    position: [-3, 0],
                    label: "A",
                    color: "#4CAF50",
                    radius: 8,
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
                    position: [2, 0],
                    label: "B",
                    color: "#FF5722",
                    radius: 8,
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
                        id: "distanceCheck",
                        type: "distance",
                        pointId1: "pointA",
                        pointId2: "pointB",
                        targetDistance: 5,
                        tolerance: 0.5,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Perfect! The distance between A and B is 5 units.",
                            incorrect: "The distance between A and B should be 5 units."
                        }
                    }
                ]
            }
        }
    },

    slopeValidation: {
        name: "Slope Validation (Phase 2)",
        description: "Validate slope between two points",
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
                    type: "point",
                    id: "pointA",
                    position: [0, 0],
                    label: "A",
                    color: "#4CAF50",
                    radius: 8,
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
                    position: [2, 4],
                    label: "B",
                    color: "#FF5722",
                    radius: 8,
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
                        id: "slopeCheck",
                        type: "slope",
                        pointId1: "pointA",
                        pointId2: "pointB",
                        targetSlope: 2,
                        tolerance: 0.2,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Perfect! The slope between A and B is 2 (rise/run = 2/1).",
                            incorrect: "The slope between A and B should be 2. Remember: slope = (y₂-y₁)/(x₂-x₁)"
                        }
                    }
                ]
            }
        }
    },

    pointOnFunction: {
        name: "Point on Function (Phase 2)",
        description: "Validate that point lies on a function",
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
                {
                    type: "function",
                    id: "parabola",
                    expression: "0.5*x^2 - 2",
                    color: "#2196F3",
                    thickness: 3,
                    domain: [-8, 8],
                    samples: 200
                },
                {
                    type: "point",
                    id: "pointP",
                    position: [2, 0],
                    label: "P",
                    color: "#4CAF50",
                    radius: 8,
                    draggable: {
                        enabled: true,
                        snap: {
                            enabled: true,
                            type: "grid",
                            tolerance: 0.3
                        }
                    }
                }
            ],
            validation: {
                rules: [
                    {
                        id: "functionCheck",
                        type: "pointOnFunction",
                        pointId: "pointP",
                        functionId: "parabola",
                        tolerance: 0.2,
                        scoring: {
                            correct: 1.0
                        },
                        feedback: {
                            correct: "Point P is on the parabola y = 0.5x² - 2!",
                            incorrect: "Point P should be on the parabola. Try different positions!"
                        }
                    }
                ]
            }
        }
    }
};
