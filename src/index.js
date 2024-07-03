const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const imageSetName = packageJson.name.replace(/^@.*\//, ''); // Removes scope if present
const imageSetDir = path.join(__dirname, '..', 'public', 'images', imageSetName);

function getImageList(dir = imageSetDir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getImageList(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.webp')) {
      results.push(path.relative(imageSetDir, fullPath));
    }
  }

  return results;
}

function getImageSetName() {
  return imageSetName;
}

module.exports = {
  getImageList,
  getImageSetName,
};
