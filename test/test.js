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
    },
    module: {
      rules: [
        {
          test: /\.lines$/,
          loader: path.resolve(process.env.MAIN),
        },
      ],
    },
  }
  await webpack(webpackConfig)
  const result = require(path.join(webpackConfig.output.path, "main.js")).default
  expect(result.a).toStrictEqual([
    "1",
    "2 3",
  ])
  expect(result.bSorted).toStrictEqual([
    "a",
    "b",
    "c .",
    "d      f",
  ])
  expect(result.bUnsorted).toStrictEqual([
    "a",
    "c .",
    "b",
    "d      f",
  ])
  expect(result.unique).toStrictEqual([
    "chloe",
    "maxine",
    "rachel",
  ])
  expect(result.fromReadme).toStrictEqual([
    "maxine",
    "chloe",
    "",
    "rachel",
    "",
    "",
    "chloe",
    "",
  ])
  expect(result.fromReadmeNormalized).toStrictEqual([
    "chloe",
    "maxine",
    "rachel",
  ])
  expect(["chloe", "maxine", "rachel"].includes(result.pick)).toBeTruthy()
})