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