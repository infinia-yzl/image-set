// @ts-check
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const packageJson = require('../package.json');

/**
 * @type {string}
 */
const imageSetName = packageJson.name.replace(/^@.*\//, ''); // Removes scope if present
const baseImageDir = path.join(__dirname, '..', 'public', 'images');
const imageSetDir = path.join(baseImageDir, imageSetName);

/**
 * Ensures the correct structure for the image set.
 * @returns {Promise<void>}
 */
async function ensureImageSetStructure() {
  try {
    await fs.mkdir(imageSetDir, { recursive: true });
    const entries = await fs.readdir(baseImageDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name !== imageSetName && !entry.name.startsWith('.')) {
        const srcPath = path.join(baseImageDir, entry.name);
        const destPath = path.join(imageSetDir, entry.name);
        await fs.rename(srcPath, destPath);
        console.log(`Moved ${entry.name} into ${imageSetName} folder`);
      }
    }
  } catch (error) {
    console.error('Error ensuring image set structure:', error);
  }
}

/**
 * Compresses images in the given directory.
 * @param {string} dir - The directory to process.
 * @returns {Promise<void>}
 */
async function compressImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await compressImages(fullPath);
      } else if (entry.isFile() && entry.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const outputPath = path.join(dir, `${path.parse(entry.name).name}.webp`);
        const tempOutputPath = path.join(dir, `temp_${path.parse(entry.name).name}.webp`);

        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(tempOutputPath);

        // Remove the original file if it's not already a WebP
        if (!entry.name.endsWith('.webp')) {
          await fs.unlink(fullPath);
        }

        // Rename the temp file to the final output name
        await fs.rename(tempOutputPath, outputPath);

        console.log(`Compressed and replaced: ${fullPath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

/**
 * Main function to run the image compression process.
 * @returns {Promise<void>}
 */
async function main() {
  try {
    await ensureImageSetStructure();
    await compressImages(imageSetDir);
    console.log('Image compression completed successfully!');
  } catch (error) {
    console.error('Error during image compression:', error);
  }
}

main();
