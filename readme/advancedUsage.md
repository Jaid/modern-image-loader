### React Example

The default returned object makes it easy to be used in frameworks like React.

`index.js`
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
<body>
  <div class="main">
    <picture>
      <source srcset="dog.webp" type="image/webp" />
      <source srcset="dog.jpeg" type="image/jpeg" />
      <img src="dog.jpeg" alt="Dog" />
    </picture>
  </div>
</body>
```

### Export types

What `image` will be in `import image from "./dog.jpeg"`, depends on the chosen export type. It is `dom` by default.

#### dom

```javascript
{
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
"dog.jpeg"
```

#### paths

```javascript
{
  webp: "dog.webp",
  fallback: "dog.jpeg"
}
```