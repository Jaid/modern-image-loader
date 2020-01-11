/** @module modern-image-loader */

import ensureEnd from "ensure-end"
import imagemin from "imagemin"
import imageminJpegtran from "imagemin-jpegtran"
import imageminPngquant from "imagemin-pngquant"
import imageminWebp from "imagemin-webp"
import {getOptions, interpolateName, parseQuery} from "loader-utils"
import mimeTypes from "mime-types"
import validateOptions from "schema-utils"

import optionsSchema from "./optionsSchema.yml"

/**
 * @type {import("imagemin-webp").Options}
 */
const defaultWebpConfig = {
  quality: 95,
  nearLossless: 50,
  sharpness: 5,
}

/**
 * @type {import("imagemin-jpegtran").Options}
 */
const defaultJpegtranConfig = {

}

/**
 * @type {import("imagemin-pngquant").Options}
 */
const defaultPngquantConfig = {
  strip: true,
}

/**
 * @param {string} source
 * @return {string}
 */
export default function (source) {
  this.cacheable && this.cacheable()
  const callback = this.async()
  const options = {
    inputMime: mimeTypes.lookup(this.resourcePath),
    webp: defaultWebpConfig,
    jpegtran: defaultJpegtranConfig,
    pngquant: defaultPngquantConfig,
    webpFileName: "[hash:8].[ext]",
    fallbackFileName: "[hash:8].[ext]",
    alt: null,
    export: "dom",
    // eslint-disable-next-line no-underscore-dangle
    publicPath: this._compilation.outputOptions.publicPath || null,
    ...getOptions(this),
    ...this.resourceQuery ? parseQuery(this.resourceQuery) : undefined,
  }
  validateOptions(optionsSchema, options, _PKG_TITLE)
  const resolvePublic = file => {
    if (!options.publicPath) {
      return file
    }
    const publicPathNormalized = ensureEnd(options.publicPath, "/")
    return publicPathNormalized + file
  }
  const finish = ([fallbackBuffer, webpBuffer]) => {
    const fallbackExtension = mimeTypes.extension(options.inputMime)
    const fallbackFileName = interpolateName(this, options.fallbackFileName.replace("[ext]", fallbackExtension), {
      content: fallbackBuffer,
    })
    const webpFileName = interpolateName(this, options.webpFileName.replace("[ext]", "webp"), {
      content: webpBuffer,
    })
    this.emitFile(fallbackFileName, fallbackBuffer)
    this.emitFile(webpFileName, webpBuffer)
    const publicFallbackFileName = resolvePublic(fallbackFileName)
    const publicWebpFileName = resolvePublic(webpFileName)
    let returnValue = {}
    if (options.export === "dom") {
      returnValue = {
        webp: {
          srcset: publicWebpFileName,
          type: "image/webp",
        },
        fallback: {
          srcset: publicFallbackFileName,
          type: options.inputMime,
        },
        img: {
          src: publicFallbackFileName,
        },
      }
      if (options.alt) {
        returnValue.img.alt = options.alt
      }
    } else if (options.export === "fallbackPath") {
      returnValue = publicFallbackFileName
    } else if (options.export === "paths") {
      returnValue = {
        webp: publicWebpFileName,
        fallback: publicFallbackFileName,
      }
    }
    callback(null, `export default ${JSON.stringify(returnValue)}`)
  }
  const fail = error => {
    callback(error)
  }
  const encodeWebp = imagemin.buffer(source, {
    plugins: [imageminWebp(options.webp)],
  })
  let encodeFallback
  if (options.inputMime === "image/jpeg") {
    encodeFallback = imagemin.buffer(source, {
      plugins: [imageminJpegtran(options.jpegtran)],
    })
  } else {
    encodeFallback = imagemin.buffer(source, {
      plugins: [imageminPngquant(options.imageminPngquant)],
    })
  }
  Promise.all([encodeFallback, encodeWebp]).then(finish).catch(fail)
}

export const raw = true