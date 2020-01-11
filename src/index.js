/** @module modern-image-loader */

import {getOptions, parseQuery} from "loader-utils"
import {uniq} from "lodash"
import validateOptions from "schema-utils"

import optionsSchema from "./optionsSchema.yml"

/**
 * @param {string} source
 * @return {string}
 */
export default function (source) {
  const options = {
    sort: false,
    randomPick: false,
    trim: true,
    nonEmpty: true,
    unique: false,
    ...getOptions(this),
    ...this.resourceQuery ? parseQuery(this.resourceQuery) : undefined,
  }
  validateOptions(optionsSchema, options, _PKG_TITLE)
  const lines = source.split(/[\n\r]/)
  let processedLines = lines
  if (options.trim) {
    processedLines = processedLines.map(line => line.trim())
  }
  if (options.nonEmpty) {
    processedLines = processedLines.filter(line => line.length)
  }
  if (options.unique) {
    processedLines = uniq(processedLines)
  }
  if (options.sort) {
    processedLines = processedLines.sort()
  }
  if (options.randomPick) {
    return `const lines = ${JSON.stringify(processedLines)}\nexport default () => lines[Math.floor(Math.random() * lines.length)]`
  } else {
    return `export default ${JSON.stringify(processedLines)}`
  }
}