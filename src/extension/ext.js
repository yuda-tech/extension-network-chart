import { dimLongDesc, nodeTypeLongDesc } from './strings';

const conditionalShowOnDimensions = (properties, handler, items) => {
  let index;
  handler.getDimensions().forEach((element, i) => {
    if (element.qDef.cId === properties.qDef.cId) {
      index = i;
    }
  });
  const itemsToIndex = items.map((item) => {
    if (item === "id") return 0;
    if (item === "label") return 1;
    if (item === "parentid") return 2;
    if (item === "group") return 3;
  });
  return itemsToIndex.includes(index);
};

export default function ext() {
  return {
    definition: {
      type: "items",
      component: "accordion",
      items: {
        data: {
          uses: "data",
          items: {
            dimensions: {
              disabledRef: "",
              items: {
                helpDesc: {
                  component: 'text',
                  style: 'qlik-network-chart-italic-property',
                  label: function (properties, handler) {
                    let index;
                    handler.getDimensions().forEach((element, i) => {
                      if (element.qDef.cId === properties.qDef.cId) {
                        index = i;
                      }
                    });
                    return dimLongDesc[index];
                  }
                },
                nodeColorExpr: {
                  ref: "qAttributeExpressions.0.qExpression",
                  label: "Node Color Expression",
                  type: "string",
                  component: "expression",
                  show: (properties, handler) => conditionalShowOnDimensions(properties, handler, ["id"]),
                },
                nodeType: {
                  ref: "qDef.nodeType",
                  label: "Node Type",
                  type: "string",
                  component: "dropdown",
                  options: [
                    { value: "shapes", label: "Shape" },
                    { value: "icon", label: "Icon" },
                    { value: "image", label: "Image" },
                  ],
                  defaultValue: "shapes",
                  show: (properties, handler) => conditionalShowOnDimensions(properties, handler, ["id"]),
                },
                nodeTypeHelpDesc: {
                  component: 'text',
                  style: 'qlik-network-chart-italic-property',
                  label: function (properties) {
                    const nodeType = properties.qDef.nodeType;
                    if (nodeType) {
                      return nodeTypeLongDesc[nodeType];
                    }
                  },
                  show: (properties, handler) => 
                    conditionalShowOnDimensions(properties, handler, ["id"]) && properties.qDef.nodeType,
                },
                nodeTypeExpr: {
                  ref: "qAttributeExpressions.1.qExpression",
                  label: "Node Type Expression",
                  type: "string",
                  component: "expression",
                  defaultValue: "='dot'",
                  show: (properties, handler) => 
                    conditionalShowOnDimensions(properties, handler, ["id"]) && properties.qDef.nodeType,
                },
              }
            },
            measures: {
              disabledRef: ""
            }
          }
        },
        sorting: {
          uses: "sorting"
        },
        addons: {
          uses: "addons",
          items: {
            dataHandling: {
              uses: "dataHandling"
            }
          }
        },
        settings: {
          type: "items",
          uses: 'settings',
          items: {
            presentation: {
              type: 'items',
              grouped: false,
              translation: 'properties.presentation',
              items: {
                edgeType: {
                  ref: "edgeType",
                  type: "string",
                  component: "dropdown",
                  label: "Edge Type",
                  options: [
                    { value: 'dynamic' },
                    { value: 'continuous' },
                    { value: 'discrete' },
                    { value: 'diagonalCross' },
                    { value: 'straightCross' },
                    { value: 'horizontal' },
                    { value: 'vertical' },
                    { value: 'curvedCW' },
                    { value: 'curvedCCW' },
                    { value: 'cubicBezier' }
                  ],
                  defaultValue: "dynamic"
                },
                displayEdgeLabel: {
                  ref: "displayEdgeLabel",
                  type: "boolean",
                  component: "switch",
                  label: "Display Edge Value",
                  options: [{
                    value: true,
                    label: "On"
                  }, {
                    value: false,
                    label: "Off"
                  }],
                  defaultValue: false
                },
                posEdgeLabel: {
                  ref: "posEdgeLabel",
                  type: "string",
                  component: "dropdown",
                  label: "Position Edge Label",
                  options: [
                    { value: 'top' }, { value: 'middle' }, { value: 'bottom' }, { value: 'horizontal' }
                  ],
                  defaultValue: "top"
                },
                arrowType: {
                  ref: "arrowType",
                  type: "string",
                  component: {
                    template: `
                      <div class="chart-title-font-style-wrapper">
                        <div class="chart-title-font-style-label">Arrows</div>
                        <div class="lui-buttongroup chart-title-font-style-selector">
                          <button
                            class="lui-button"
                            ng-class="{'lui-active': data.arrowFrom}"
                            title="From"
                            ng-click="handleClick('arrowFrom')"
                          >
                            From
                          </button>
                          <button
                            class="lui-button"
                            ng-class="{'lui-active': data.arrowMiddle}"
                            title="Middle"
                            ng-click="handleClick('arrowMiddle')"
                          >
                            Middle
                          </button>
                          <button
                            class="lui-button"
                            ng-class="{'lui-active': data.arrowTo}"
                            title="To"
                            ng-click="handleClick('arrowTo')"
                          >
                            To
                          </button>
                        </div>
                      </div>
                    `,
                    controller: ["$scope", "$element", function($s) {
                      $s.handleClick = (arrow) => {
                        $s.data[arrow] = !$s.data[arrow];
                        $s.$emit("saveProperties");
                      };
                    }]
                  }
                },
                shadowMode: {
                  ref: "shadowMode",
                  type: "boolean",
                  component: "switch",
                  label: "Display Shadow",
                  options: [{
                    value: true,
                    label: "On"
                  }, {
                    value: false,
                    label: "Off"
                  }],
                  defaultValue: false
                }
              }
            }
          }
        },
        about: {
          component: 'items',
          label: 'About',
          items: {
            header: {
              label: 'Network chart',
              style: 'header',
              component: 'text'
            },
            paragraph1: {
              label:
                `Network chart is Qlik Sense chart which
              allows you to draw a network of connected
              nodes and edges from a data set to a sheet.`,
              component: 'text'
            },
            paragraph2: {
              label: 'Network chart is based upon an extension created by Michael Laenen.',
              component: 'text'
            }
          }
        }
      }
    },
    support: {
      export: true,
      snapshot: true,
      exportData: true
    },
    snapshot: {
      canTakeSnapshot: true
    },
  };
}
