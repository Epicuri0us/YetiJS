YetiJS
======

YetiJS is a JavaScript framework that provides utitlity to write HTML5-Games faster and easier.
It was initially planned to work in combination with CocoonJS, but I'm focusing on major browsers right now because smartphones lack performance at the moment.

Note: YetiJS is in a very early stage, many things are missing or not fully implemented by now, and there is no learning material.

Dependencies
------
YetiJS uses a few libraries and tools:

- Box2DWeb, a JavaScript port of the beautiful Box2D physics library (http://code.google.com/p/box2dweb/)
- SAT, a library (Separating Axis Theorem) from Jim Riecken is used as a vary fast way to check if convex polygons collide (https://github.com/jriecken/sat-js)
- vector2d, a slightly modified version of Tudor Nita's 2D vector library (http://www.cgrats.com/javascript-2d-vector-library.html)
- yui-compressor, a tool from yahoo used to compress the final js-file (http://developer.yahoo.com/yui/compressor/)
- RequestAnimationFrame, a function written by Paul Irish that helps synchronising draw calls with monitor/browser update rate (http://paulirish.com/2011/requestanimationframe-for-smart-animating/)

Documentation
------
I used JSDoc 3 (https://github.com/jsdoc3/jsdoc) to create a class-documentation similar to javadoc. It will be accessible soon here: http://leoz.ch/yetijs/doc

Start a new YetiJS-project
------
I have put together a project template you just have to download and begin developing.
