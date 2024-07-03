# Image Set Template

This template provides a structure for creating and publishing npm packages containing compressed image sets. It's designed to work seamlessly with Next.js projects and includes automatic image compression.

## Setting Up Your Own Image Set

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/image-set-template.git your-image-set-name
   cd your-image-set-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update the `package.json` file:
   - Change the `name` field to a unique name for your image set
   - Update the `description`, `keywords`, and `author` fields

4. Add your images:
   - Place your images in the `public/images/` directory
   - The script will automatically create a subdirectory with your package name and move all images into it

5. Compress your images:
   ```
   npm run compress-images
   ```
   This will organize your images, compress them, convert them to WebP format, and replace the originals.

6. Update the LICENSE file with your preferred license

7. Update this README with information about your specific image set

## Folder Structure

The script will create a folder structure like this:

```
public/
  images/
    your-package-name/
      category1/
        image1.webp
        image2.webp
      category2/
        subcategory/
          image3.webp
      image4.webp
```

You can organize your images in any way you prefer within the `your-package-name/` directory. The script will maintain your folder structure while compressing and converting the images.

## Image Compression

This template uses the `sharp` library to automatically compress and convert images to the WebP format. The compression script:

- Creates a folder with your package name in `public/images/` if it doesn't exist
- Moves any misplaced files or folders into this folder
- Converts all images to WebP format
- Reduces image quality to 80% (adjustable in `scripts/compress-images.js`)
- Replaces original images with compressed versions
- Maintains the original folder structure within your package folder

To customize compression settings, edit the `scripts/compress-images.js` file.

## NPM Tutorial

If you're new to npm, here's a quick guide to get you started:

1. Create an npm account:
   - Go to https://www.npmjs.com/ and click "Sign Up"
   - Follow the registration process

2. Log in to npm from your terminal:
   ```
   npm login
   ```
   Enter your username, password, and email when prompted

3. Prepare your package for publication:
   - Ensure your `package.json` file is correctly filled out
   - Run `npm run compress-images` to optimize your images

4. Publish your package:
   ```
   npm publish
   ```
   If this is your first time publishing this package, it will create a new package on npm

5. Updating your package:
   - Make your changes
   - Update the version number in `package.json` (e.g., from "1.0.0" to "1.0.1")
   - Run `npm publish` again

6. Managing versions:
   - Use semantic versioning (MAJOR.MINOR.PATCH)
   - Increment PATCH for backwards-compatible bug fixes
   - Increment MINOR for new backwards-compatible functionality
   - Increment MAJOR for incompatible changes

Remember, once you publish a version, you can't overwrite it. Always increment the version number for new publications.

## Publishing Your Package

To publish your package to npm:

1. Make sure you have an npm account and are logged in locally
2. Run the publish script:
   ```
   npm run publish-package
   ```
3. Follow the prompts to bump the version and publish

## Using the Image Set in a Next.js Project

1. Install the package in your Next.js project:
   ```
   npm install your-package-name
   ```

2. Update your `next.config.js`:
   ```javascript
   const path = require('path');

   module.exports = {
     webpack: (config, { dev, isServer }) => {
       config.resolve.modules.push(path.resolve('./node_modules/your-package-name/public'));
       return config;
     },
   };
   ```

3. Use the images in your Next.js components:
   ```jsx
   import Image from 'next/image';
   import { getImageSetName } from 'your-package-name';

   export default function MyComponent() {
     const imageSetName = getImageSetName();
     return (
       <Image 
         src={`/images/${imageSetName}/example-image.webp`}
         width={500}
         height={300}
         alt="Example image"
       />
     );
   }
   ```

Note: All images are compressed and converted to WebP format. Make sure to use the `.webp` extension when referencing them.

## License

See the [LICENSE](LICENSE) file for details.
