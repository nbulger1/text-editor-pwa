const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      // added webpack PWA manifest to create the manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        // long name for the application
        name: "Just Another Text Editor",
        // short name for the application
        short_name: "J.A.T.E",
        // description of the application
        description: "Takes Notes with Javascript syntax highlighting!",
        // background and theme colors
        background_color: "#225ca3",
        theme_color: "#225ca3",
        // define the start URL and public path - make sure it matches the "/" or "./" in the if statement in index.js
        start_url: "/",
        publicPath: "/",
        // define the icon using the logo in the image file - making multiple different size options of that logo
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      // added the InjectManifest with src file and service worker destination file
      new InjectManifest({ swSrc: "./src-sw.js", swDest: "service-worker.js" }),
    ],

    module: {
      rules: [
        // added in style- and css-loader for formatting
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // adding in babel-loader to translate different javascript languages to one most likely universal to the browser
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
