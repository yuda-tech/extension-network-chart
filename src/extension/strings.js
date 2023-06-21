export const dimDesc = [
  "Node Identifier",
  "Node Label",
  "Node Parent",
  "Node Group"
];

export const dimLongDesc = [
  "Node Identifier - a field in the dataset which should be presented as a node in the network diagram."
  + " these control the actual elements presented in the network diagram.",
  "Node Label - controls what field holds the data that described the nodes in the network"
  + " diagram. The field content will be presented as label.",
  "Node Parent - is used to determine the ancestor node for the individual nodes."
  + " This field will be used for describing the relationships between network elements.",
  "Node Group - is a field which describes groups of a node in the network."
  + " This is used to apply the same color to several nodes."
];

export const measureDesc = [
  "Tooltip",
  "Node size",
  "Edge size"
];

export const nodeTypeLongDesc = {
  shapes: `The types with the label inside of it are: ellipse, circle, database, box, text.\n`
          + "The ones with the label outside of it are: diamond, dot, star, triangle, triangleDown, hexagon, square.",
  image: "This option should be the URL to an image",
  icon: "This is the code of the icon, for example '\\uf007'."
};