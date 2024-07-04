// @ts-check
const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

/**
 * @type {string}
 */
const imageSetName = packageJson.name.replace(/^@.*\//, ''); // Removes scope if present
const imageSetDir = path.join(__dirname, '..', 'public', 'images', imageSetName);

/**
 * Recursively gets a list of image files in the given directory.
 * @param {string} [dir] - The directory to search (defaults to imageSetDir).
 * @returns {string[]} An array of relative file paths.
 */
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

/**
 * Gets the name of the image set.
 * @returns {string} The name of the image set.
 */
function getImageSetName() {
  return imageSetName;
}

module.exports = {
  getImageList,
  getImageSetName,
};
