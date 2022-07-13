## Text Editor PWA - Homework Week 19

## Description

I was tasked to build a progressive web application that runs in the browser. This single-page application meets PWA criteria, features a number of data persistqance techniques to serve as redunancy should one not be supported by a browser, and functions offline.

I was given an existing application and instructed to implement methods for getting and storing data to an IndexedDB database. I used the `idb` package, a lightweight wrapper around the IndexedDB API, that features a number of methods useful for storing and retrieving data.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Inject Manifest](#inject-manifest)
- [Webpack Configuration](#webpack-configuration)
- [IndexedDB](#indexeddb)
- [License](#license)
- [Link](#link)

## User Story

```md
AS A developer
I WANT to create notes or code snippets with or without an internet connection
SO THAT I can reliably retrieve them for later use
```

## Acceptance Criteria

```md
GIVEN a text editor web application
WHEN I open my application in my editor
THEN I should see a client server folder structure
WHEN I run `npm run start` from the root directory
THEN I find that my application should start up the backend and serve the client
WHEN I run the text editor application from my terminal
THEN I find that my JavaScript files have been bundled using webpack
WHEN I run my webpack plugins
THEN I find that I have a generated HTML file, service worker, and a manifest file
WHEN I use next-gen JavaScript in my application
THEN I find that the text editor still functions in the browser without errors
WHEN I open the text editor
THEN I find that IndexedDB has immediately created a database storage
WHEN I enter content and subsequently click off of the DOM window
THEN I find that the content in the text editor has been saved with IndexedDB
WHEN I reopen the text editor after closing it
THEN I find that the content in the text editor has been retrieved from our IndexedDB
WHEN I click on the Install button
THEN I download my web application as an icon on my desktop
WHEN I load my web application
THEN I should have a registered service worker using workbox
WHEN I register a service worker
THEN I should have my static assets pre cached upon loading along with subsequent pages and static assets
WHEN I deploy to Heroku
THEN I should have proper build scripts for a webpack
```

## Inject Manifest

Inject manifest was used to create the service worker. The service worker stands between the client request and the server. When the client sends a request, the service worker checks the cache to see if it holds the response before attempting to reach the server. The service worker is vital for PWA offline function.

I used the `src-sw.js` file as the source file for the `InjectManifest` plugin in the `webpack.config.js` file. The destination file, created when webpack bundles materials, was deemed `service-worker.js`.

The `src-sw.js` file holds the assest caching set up that holds the static resources in the cache for the service worker to handle. When `npm run start` is run the cache is created with the style, script, and worker files.

## Webpack Configuration

The `webpack.config.js` file holds the set up to allow proper bundling of materials to create the `dist` folder. The mode, entry, output, and HtmlWebpackPlugin were already present in the materials provided.

I added the `WebpackPwaManifest` plugin to create the `manifest.json` upon webpack bundling. The manifest file contains the name, short name, description, key colors, start URL, public path, and icon definitions. There was only one logo in the images folder so I defined several different sizes of the logo so that they can be used in placeholder paths.

I added the `InjectManifest` plugin to define the source and destination of the service worker file created when bundling.

Finally, I added the `style-loader`, `css-loader`. and `babel-loader` to handle all CSS styling as well as Javascript translation from all other language versions to ES5 to span browsers.

## IndexedDB

The IndexedDB was created using the `idb` package. The `database.js` file holds all database related functions. The `initDB()` function checks for database existance and updates or creates it if necessary. I also added in the ability to update the notes in the text editor (`putDB()`) and the function, `getDB()`, the pulls the data from the database to repopulate on page load.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is protected under the MIT License.

## Link

See the following for deployed application: https://text-editor-pwa-bulger.herokuapp.com/
