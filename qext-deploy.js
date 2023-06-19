/* eslint-disable no-console */
const fs = require('fs-extra');

const sourceDir = './extension-network-chart-ext';
const targetDir = 'D:\\Data\\Qlik\\Sense\\Extensions\\extension-network-chart-ext';

fs.copy(sourceDir, targetDir, {
  overwrite: true,
}, (err) => {
  if (err) {
    console.error('deploy error: ', err);
  } else {
    console.log('deploy success!');
  }
});
