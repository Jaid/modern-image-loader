import {CleanWebpackPlugin} from "clean-webpack-plugin"
import path from "path"
import pify from "pify"

const webpack = pify(require("webpack"))

it("should run", async () => {
  const name = "basic"
  /**
   * @type {import("webpack").Configuration}
   */
  const webpackConfig = {
    mode: "development",
    target: "node",
    context: path.join(__dirname, name),
    entry: path.join(__dirname, name),
    output: {
      path: path.join(__dirname, "..", "dist", "test", name),
      libraryTarget: "umd2",
      publicPath: "/static",
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg)$/,
          loader: path.resolve(process.env.MAIN),
        },
      ],
    },
    plugins: [new CleanWebpackPlugin],
  }
  await webpack(webpackConfig)
  const result = require(path.join(webpackConfig.output.path, "main.js")).default
  const srcPathRegex = /^\/static\/[\w-]{6}\.[a-z]+$/
  expect(result.cat.webp.srcset).toMatch(srcPathRegex)
  expect(result.cat.fallback.srcset).toMatch(srcPathRegex)
  expect(result.cat.img.alt).toStrictEqual("Cat")
  expect(result.dog.webp.srcset).toMatch(srcPathRegex)
  expect(result.dog.fallback.srcset).toMatch(srcPathRegex)
  expect(result.dog.img.alt).toStrictEqual("Dog")
})