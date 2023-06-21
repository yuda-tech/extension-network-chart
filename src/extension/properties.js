export default {
  /**
   * Current version of this generic object definition
   * @type {string}
   */
  version: process.env.PACKAGE_VERSION,
  /**
   * Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.
   * @extends {HyperCubeDef}
   */
  qHyperCubeDef: {
    qDimensions: [],
    qMeasures: [],
    qInitialDataFetch: [
      {
        qWidth: 7,
        qHeight: 1400,
      },
    ],
  },
  /**
   * @type {boolean=}
   */
  showTitles: false,
  /**
   * @type {string=}
   */
  title: "",
  /**
   * @type {string=}
   */
  subtitle: "",
  /**
   * @type {string=}
   */
  footnote: "",
  /**
   * @type {('dynamic'|'continuous'|'discrete'|'diagonalCross'|'straightCross'|'horizontal'|'vertical'|'curvedCW'|'curvedCCW'|'cubicBezier')=}
   */
  edgeType: "dynamic",
  /**
   * @type {('source'|'target'|'custom')=}
   */
  edgeColor: "source",
  /**
   * @type {boolean=}
   */
  edgeReverse: false,
  /**
   * @type {boolean=}
   */
  displayEdgeLabel: false,
  /**
   * @type {boolean=}
   */
  arrowFrom: false,
  /**
   * @type {boolean=}
   */
  arrowMiddle: false,
  /**
   * @type {boolean=}
   */
  arrowTo: false,
  /**
   * @type {('top'|'middle'|'bottom'|'horizontal')=}
   */
  posEdgeLabel: "top",
  /**
   * @type {boolean=}
   */
  shadowMode: false,
};