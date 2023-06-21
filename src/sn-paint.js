import { Network } from 'vis-network';
import { createTooltipHTML } from './tooltip';
import { escapeHTML } from './utilities';
import './styles/main.css';
import 'font-awesome/css/font-awesome.css';
import { hideSplash, showSplash } from './splash';

function isTextCellNotEmpty(c) {
  return (c.qText && !(c.qIsNull || c.qText.trim() == ''));
}

function getColor(index, colors) {
  return colors[index % colors.length];
}

export default function paint({ element, layout, theme, selections, constraints }) {
  return new Promise((resolve) => {
    const colorScale = theme.getDataColorPalettes()[0];
    const dimensions = layout.qHyperCube.qDimensionInfo;
    const numDimensions = layout.qHyperCube.qDimensionInfo.length;
    const numMeasures = layout.qHyperCube.qMeasureInfo.length;

    var qData = layout.qHyperCube.qDataPages[0],
      id = layout.qInfo.qId,
      containerId = 'network-container_' + id;

    if (qData && qData.qMatrix) {
      element.textContent = '';
      const topDiv = document.createElement("div");
      topDiv.setAttribute('id', containerId);
      topDiv.classList.add('sn-network-top');
      constraints.passive && topDiv.classList.add('is-edit-mode');
      element.append(topDiv);

      var dataSet = qData.qMatrix.map(function (e) {
        const nodeName = e[1].qText;
        const nodeAttrs = e[0]?.qAttrExps?.qValues;
        let groupNumber;

        const dataItem = {
          id: e[0].qText,
          eNum: e[0].qElemNumber,
          label: nodeName,
          parentid: e[2].qText
        };

        if (numDimensions === 4) {
          groupNumber = e[3].qText;
          dataItem.group = groupNumber;
        }

        // custom node color
        if (nodeAttrs && nodeAttrs[0]) {
          dataItem.color = nodeAttrs[0].qText;
        }
        // custom node type
        if (nodeAttrs && nodeAttrs[1]) {
          if (dimensions[0].nodeType === "shapes") {
            dataItem.shape = nodeAttrs[1].qText;
          } else if (dimensions[0].nodeType === "icon") {
            dataItem.shape = "icon";
            dataItem.icon = {
              face: "FontAwesome",
              code: nodeAttrs[1].qText,
            };
          } else if (dimensions[0].nodeType === "image") {
            dataItem.shape = "image";
            dataItem.image = nodeAttrs[1].qText;
          }
        }

        // optional measures set
        if (numMeasures > 0) {
          const tooltip = e[numDimensions];

          if (isTextCellNotEmpty(tooltip)) {
            const tooltipText = tooltip.qText;
            dataItem.title = escapeHTML(tooltipText);
          } else if (numMeasures > 1) {
            // This part is a bit fishy and should be tested
            const nodeMeasure = e[numDimensions + 1].qText;
            dataItem.title = createTooltipHTML({
              name: nodeName,
              groupNumber,
              nodeMeasure
            });
          }
        }

        if (numMeasures > 1) {
          if (e[numDimensions + 1].qNum) {
            // node value - to scale node shape size
            dataItem.nodeValue = e[numDimensions + 1].qNum;
          }
        }

        if (numMeasures > 2) {
          if (e[numDimensions + 2].qNum) {
            // edge value - to scale edge width
            dataItem.edgeValue = e[numDimensions + 2].qNum;
          }
        }

        return dataItem;
      });

      // Require 2 arrays :  nodes and edges -  nodes array must be unique values of IDs !
      var uniqueId = [];
      var nodes = [];
      var edges = [];
      const groups = {};

      for (let i = 0; i < dataSet.length; i++) {
        if (layout.displayEdgeLabel && dataSet[i].edgeValue !== undefined) {
          const edge = {
            from: layout.edgeReverse ? dataSet[i].parentid : dataSet[i].id,
            to: layout.edgeReverse ? dataSet[i].id : dataSet[i].parentid,
            value: dataSet[i].edgeValue,
            label: `${dataSet[i].edgeValue}`,
            color: {
              color: layout.edgeColor === 'custom' ? layout.edgeColorExpr : undefined,
              inherit: layout.edgeColor === 'source' ? 'from' : (layout.edgeColor === 'target' ? 'to' : false),
            }
          };
          if (edge.from !== edge.to) edges.push(edge); // with labels
        } else {
          const edge = {
            from: layout.edgeReverse ? dataSet[i].parentid : dataSet[i].id,
            to: layout.edgeReverse ? dataSet[i].id : dataSet[i].parentid,
            value: dataSet[i].edgeValue,
            color: {
              color: layout.edgeColor === 'custom' ? layout.edgeColorExpr : undefined,
              inherit: layout.edgeColor === 'source' ? 'from' : (layout.edgeColor === 'target' ? 'to' : false),
            }
          };
          if (edge.from !== edge.to) edges.push(edge); // create edges
        }

        // process uniqueness
        if (uniqueId.indexOf(dataSet[i].id) === -1) {
          uniqueId.push(dataSet[i].id);

          var nodeItem = {
            id: dataSet[i].id,
            eNum: dataSet[i].eNum,
            label: dataSet[i].label,
            title: dataSet[i].title,
            group: dataSet[i].group,
            value: dataSet[i].nodeValue,
            color: dataSet[i].color,
            shape: dataSet[i].shape,
            icon: dataSet[i].icon,
            image: dataSet[i].image,
          };
          nodes.push(nodeItem); // create node
          groups[nodeItem.group] = {};
        }
      }
      const colors = colorScale.colors[Math.min(Object.keys(groups).length - 1, colorScale.colors.length - 1)];

      Object.keys(groups).forEach(function (g, i) {
        groups[g].color = getColor(i, colors);
      });

      // create dataset for \\
      var data = {
        nodes: nodes,
        edges: edges
      };

      // create a network
      var container = document.getElementById(containerId);

      var options = {
        groups: groups,
        layout: {
          randomSeed: 34545, //"0.6610209392878246:1631081903504"
          improvedLayout: false,
        },
        nodes: {
          shadow: layout.shadowMode
        },
        edges: {
          arrows: {
            from: {
              enabled: !!layout.arrowFrom,
            },
            middle: {
              enabled: !!layout.arrowMiddle,
            },
            to: {
              enabled: !!layout.arrowTo,
            }
          },
          shadow: layout.shadowMode,
          font: {
            align: layout.posEdgeLabel
          },
          smooth: {
            type: layout.edgeType
          }
        },
        interaction: {
          hideEdgesOnDrag: true,
          selectable: !constraints.active && !constraints.select,
          tooltipDelay: 100,
          multiselect: true,
          selectConnectedEdges: true
        },
        physics: {
          barnesHut: {
            gravitationalConstant: -80000,
            springConstant: 0.001,
            springLength: 200
          },
          forceAtlas2Based: {
            gravitationalConstant: -100,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18
          },
          maxVelocity: 146,
          solver: 'forceAtlas2Based',
          timestep: 0.35,
          stabilization: { iterations: 150 }
        }
      };
      var network = new Network(container, data, options);
      network.fit();
      network.on('select', function (properties) {
        if (Object.prototype.hasOwnProperty.call(properties, "nodes") && !constraints.active && !constraints.select) {
          const nodes = network.getSelectedNodes();
          if (nodes.length > 0) {
            // find connected nodes to selection
            var conNodes = nodes.map(n => network.getConnectedNodes(n));
            // append nodes to the array
            conNodes.push(nodes);
            var connectedNodes = conNodes.flat();
            const toSelect = [];
            connectedNodes.forEach(function (node) {
              var id;
              data.nodes.forEach(function (dataNode) {
                // Find match, ignore null
                if (dataNode.id === node && node !== "-") {
                  id = dataNode.eNum;
                }
              });
              if (id !== undefined) {
                // Remove duplicates
                toSelect.indexOf(id) === -1 && toSelect.push(id);
              }
            });

            //network.selectNodes(connectedNodes);

            if (!selections.isActive()) {
              selections.begin('/qHyperCubeDef');
            }

            //Make the selections
            selections.select({
              method: 'selectHyperCubeValues',
              params: ['/qHyperCubeDef', 0, toSelect, false],
            });
          }
        }
      });

      network.on("stabilizationProgress", function (params) {
        const widthFactor = params.iterations / params.total;
        const process = Math.round(widthFactor * 100) + "%";
        showSplash({
          containerId: containerId,
          title: `Loading ... ${process}`
        });
      });

      network.on('stabilizationIterationsDone', function () {
        network.stopSimulation();
        hideSplash();
        resolve(network);
      });
    } else {
      resolve();
    }
  });
}
