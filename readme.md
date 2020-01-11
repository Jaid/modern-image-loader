# modern-image-loader


<a href="https://raw.githubusercontent.com/Jaid/modern-image-loader/master/license.txt"><img src="https://img.shields.io/github/license/Jaid/modern-image-loader?style=flat-square" alt="License"/></a>  
<a href="https://actions-badge.atrox.dev/Jaid/modern-image-loader/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2FJaid%2Fmodern-image-loader%2Fbadge" alt="Build status"/></a> <a href="https://github.com/Jaid/modern-image-loader/commits"><img src="https://img.shields.io/github/commits-since/Jaid/modern-image-loader/v1.0.0?style=flat-square&logo=github" alt="Commits since v1.0.0"/></a> <a href="https://github.com/Jaid/modern-image-loader/commits"><img src="https://img.shields.io/github/last-commit/Jaid/modern-image-loader?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/Jaid/modern-image-loader/issues"><img src="https://img.shields.io/github/issues/Jaid/modern-image-loader?style=flat-square&logo=github" alt="Issues"/></a>  
<a href="https://npmjs.com/package/modern-image-loader"><img src="https://img.shields.io/npm/v/modern-image-loader?style=flat-square&logo=npm&label=latest%20version" alt="Latest version on npm"/></a> <a href="https://github.com/Jaid/modern-image-loader/network/dependents"><img src="https://img.shields.io/librariesio/dependents/npm/modern-image-loader?style=flat-square&logo=npm" alt="Dependents"/></a> <a href="https://npmjs.com/package/modern-image-loader"><img src="https://img.shields.io/npm/dm/modern-image-loader?style=flat-square&logo=npm" alt="Downloads"/></a>

**Webpack loader that outputs optimized WebP images with JPEG/PNG fallback and other neat extras.**


See [w3schools - `<picture>` tag](https://www.w3schools.com/tags/tag_picture.asp) to get an idea of when this loader can be useful.





## Usage

Add the loader to your Webpack config:

`webpack.config.js`
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: "modern-image-loader"
      }
    ]
  }
}
```

Now you can import corresponding files in your entry script:

`index.js`
```javascript
import image from "./dog.jpeg"

console.log(image)
```

## Advanced Usage

### React Example

The default returned object makes it easy to be used in frameworks like React.

```javascript
import React from "react"
import ReactDom from "react-dom"

import image from "./dog.jpeg?alt=Dog"

ReactDom.render(<div className="main">
  <picture>
    <source {...image.webp}/>
    <source {...image.fallback}/>
    <img {...image.img}/>
  </picture>
</div>, document.body)
```

This will render a DOM like this:

```html
<html>
  <body>
    <div class="main">
      <picture>
        <source srcset="dog.webp" type="image/webp" />
        <source srcset="dog.jpeg" type="image/jpeg" />
        <img src="dog.jpeg" alt="Dog" />
      </picture>
    </div>
  </body>
</html>
```

### Export types

What `image` will be in `import image from "./dog.jpeg"`, depends on the chosen export type. It is `dom` by default.

#### dom

```javascript
module.exports = {
  webp: {
    srcset: "dog.webp",
    type: "image/webp"
  },
  fallback: {
    srcset: "dog.jpeg",
    type: "image/jpeg"
  },
  img: {
    src: "dog.jpeg",
    alt: "Dog"
  }
}
```

#### fallbackPath

```javascript
module.exports = "dog.jpeg"
```

#### paths

```javascript
module.exports = {
  webp: "dog.webp",
  fallback: "dog.jpeg"
}
```

## Options

Option|Default|Description
---|---|---
alt||Value for `alt` tag
export|`domProperties`|Format of returned JavaScript value. Valid formats: `dom`, `fallbackPath`, `paths`
fallbackFileName|`[hash:8].[ext]`|Output file name. Can use webpack-specific placeholders. `[ext]` will be based on input file type.
inputMime|auto|Mime type of input file. You probably do not want to set this, as it is automatically determined based on input file extension.
jpegtran|`{}`|[`imagemin-jpegtran`](https://www.npmjs.com/package/imagemin-jpegtran) options
pngquant|`{strip: true}`|[`imagemin-pngquant`](https://www.npmjs.com/package/imagemin-pngquant) options
publicPath|as defined in Webpack config|Public path that is added to the front of file names in returned JavaScript value.
webp|`{quality: 95, nearLossless: 50, sharpness: 5}`|[`imagemin-webp`](https://www.npmjs.com/package/imagemin-webp) options
webpFileName|`[hash:8].[ext]`|Output file name. Can use webpack-specific placeholders. `[ext]` will be "webp".

## Installation
<a href="https://npmjs.com/package/modern-image-loader"><img src="https://img.shields.io/badge/npm-modern--image--loader-C23039?style=flat-square&logo=npm" alt="modern-image-loader on npm"/></a>
```bash
npm install --save-dev modern-image-loader@^1.0.0
```
<a href="https://yarnpkg.com/package/modern-image-loader"><img src="https://img.shields.io/badge/Yarn-modern--image--loader-2F8CB7?style=flat-square&logo=yarn&logoColor=white" alt="modern-image-loader on Yarn"/></a>
```bash
yarn add --dev modern-image-loader@^1.0.0
```








## Development



Setting up:
```bash
git clone git@github.com:Jaid/modern-image-loader.git
cd modern-image-loader
npm install
```
Testing:
```bash
npm run test:dev
```
Testing in production environment:
```bash
npm run test
```


## License
```text
MIT License

Copyright © 2020, Jaid <jaid.jsx@gmail.com> (github.com/jaid)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
