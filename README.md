### moveIntoView() shim

[![Build Status](https://img.shields.io/travis/linuxenko/move-into-view.svg?style=flat-square)](https://travis-ci.org/linuxenko/move-into-view) [![Coveralls](https://img.shields.io/coveralls/linuxenko/move-into-view/master.svg?style=flat-square)](https://coveralls.io/github/linuxenko/move-into-view) [![npm version](https://img.shields.io/npm/v/move-into-view.svg?style=flat-square)](https://www.npmjs.com/package/move-into-view) [![license](https://img.shields.io/github/license/linuxenko/move-into-view.svg?style=flat-square)]() [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


`moveIntoView()` is such as `scrollIntoView()` `Element` `shim` but without
scrolling, it move element into aspect ratio based position instead. Very
useful for css driven scroll animations instead of heavy cpu based animations
often used for scrolls.

[![Schema](https://raw.githubusercontent.com/linuxenko/linuxenko.github.io/master/media/move-into-view/schema.png)](https://github.com/linuxenko/move-into-view)


#### Installation

Using `npm`:

```sh
npm install move-into-view
```
CDN version:

```html
minified:

<script src="https://unpkg.com/move-into-view@latest/miw.min.js"></script>

debug
<script src="https://unpkg.com/move-into-view@latest/miw.js"></script>
```

#### Usage

`html` markup for example

```html
  <div class="parent">
    <div class="wrapper">
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
      <div id="center-me" class="child"></div>
      <div class="child"></div>
    </div>
  </div>
```

`shim` usage example

```js
 document.getElementById('center-me').moveIntoView() // both x and y
 document.getElementById('center-me').moveIntoView({x: 0})
 document.getElementById('center-me').moveIntoView({y: 0.3})
 document.getElementById('center-me').moveIntoView({x: 1})
```

Commonjs usage:

```js
var MoveIntoView = require('move-into-view');

MoveIntoView(childElement).move.x(0.3);
MoveIntoView(childElement).move.y(1);
MoveIntoView(childElement).move.both(1);
```


#### License

MIT 2017 Svetlana Linuxenko
