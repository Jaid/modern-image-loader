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