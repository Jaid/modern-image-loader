Add the loader to your Webpack config:

`webpack.config.js`
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.lines\.txt$/,
        use: "modern-image-loader"
      }
    ]
  }
}
```

Now you can import corresponding files in your entry script:

`index.js`
```javascript
import lines from "./example.lines.txt"

console.log(lines.length)
```

`example.lines.txt`
```text
maxine
chloe
rachel
```

Variable `lines` in `index.js` will look like this:
```javascript
["maxine", "chloe", "rachel"]
```