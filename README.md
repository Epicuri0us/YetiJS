YetiJS
======

YetiJS is a JavaScript framework that provides utitlity to write HTML5-Games faster and easier.
It was initially planned to work in combination with CocoonJS, but I'm focusing on major browsers right now because smartphones lack performance at the moment.

Note: YetiJS is in a very early stage, many things are missing or not fully implemented by now, and there is no learning material.

Dependencies
------
YetiJS uses a few libraries and tools:

- Box2DWeb, a JavaScript port of the beautiful Box2D physics library from Erin Catto (http://code.google.com/p/box2dweb/)
- RequestAnimationFrame, a function written by Paul Irish that helps synchronising draw calls with monitor/browser update rate (http://paulirish.com/2011/requestanimationframe-for-smart-animating/)
- Google Closure Compiler, used to optimize/minify the final script (https://developers.google.com/closure/compiler/)
- John Resig's simple javascript inheritance (http://ejohn.org/blog/simple-javascript-inheritance/)

**Removed:**
- SAT, a library (Separating Axis Theorem) from Jim Riecken is used as a vary fast way to check if convex polygons collide (https://github.com/jriecken/sat-js)
(Removed because I focus on desktop browsers rather than mobiles. Collisions should be simulated with Box2D.)
- yui-compressor, a tool from yahoo used to compress the final js-file (http://developer.yahoo.com/yui/compressor/) (Replaced by Google Closure Compiler)
- vector2d, a slightly modified version of Tudor Nita's 2D vector library (http://www.cgrats.com/javascript-2d-vector-library.html) (Replaced by Box2D's vector class)

Development Status
------
Not done by now:
- UI (I recommend using jQuery in combination with an html-overlay)
- Particles (I plan to implement this, but I first have to check for performance issues etc.)
- Rendering to different canvas (I'm looking for a clean way to implement this)
- Only Re-render parts of the canvas (Don't know how to achieve that right now)
- GC-optimizations/object recycling/...
- many things that just didn't come to my mind...

Documentation
------
I used JSDoc 3 (https://github.com/jsdoc3/jsdoc) to create a class-documentation similar to javadoc. It will be accessible soon here: http://leoz.ch/yetijs/doc

Start a new YetiJS-project
------
I have put together a project template you just have to download and begin developing.
As mentioned, there's no learning material right now, I will start making tutorials when the project is ready to work with.

License
------
This software is distributed under an extended zLib-License, you will also find it in the license.txt-file.
Don't forget to take account of the licenses of third-party tools or code you use.

<pre>Copyright (C) 2012-2013 Leo Zurbriggen http://www.leoz.ch

This software is provided 'as-is', without any express or implied warranty. 
In no event will the authors be held liable for any damages arising from the 
use of this software. Permission is granted to anyone to use this software 
for any purpose, including commercial applications, and to alter it and 
redistribute it freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not 
   claim that you wrote the original software. If you use this software in 
   a product, an acknowledgment in the product documentation would be 
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not 
   be misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
4. If we meet some day, and you think this stuff is worth it, you can buy 
   me a beer in return.</pre>