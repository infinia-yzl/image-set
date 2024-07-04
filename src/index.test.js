const { getImageList, getImageSetName } = require('./index');
const path = require('path');

describe('Image Set Library', () => {
  test('getImageSetName returns a non-empty string', () => {
    const name = getImageSetName();
    expect(typeof name).toBe('string');
    expect(name.length).toBeGreaterThan(0);
  });

  test('getImageList returns an array', () => {
    const images = getImageList();
    expect(Array.isArray(images)).toBe(true);
  });

  test('image paths in getImageList are valid', () => {
    const images = getImageList();
    images.forEach(imagePath => {
      expect(path.isAbsolute(imagePath)).toBe(false);
      expect(imagePath.endsWith('.webp')).toBe(true);
    });
  });
});
