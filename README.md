ES6 Harmony Collections Fast Polyfill
===========================================

The aim of this repository is to provide a **performances oriented** shim for ES6 collections such **WeakMap**, **Map**, and **Set**
These global functions are already available in Firefox Nightly and Chrome Dev channel through *Enable Experimental JavaScript* in *chrome://flags/* section.

Features
--------
  * compatible with **all browsers** and both **node.js** (`npm install es6-collections`) and **Rhino**
  * unobtrusive with any environment. If implemented in node V8 it exports native constructors rather than shims
  * **size and performances oriented** polyfill. It does not matter if the WeakMap is not perfect, it's just fast and not much more memory leaks prone than other shims. If you don't rely in magic, simply remember to `wm.delete(referedObject)` when *wm* is not needed anymore.
  * for browsers, it fits in **less than 1Kb** (once minzipped)[https://github.com/WebReflection/es6-collections/blob/master/build/es6-collections.min.js] ... the smallest shim out there so far
  * 100% of code coverage through (Web)[https://github.com/WebReflection/es6-collections/blob/master/tests/web.html] or (console)[https://github.com/WebReflection/es6-collections/blob/master/tests/console.js] (wru)[https://github.com/WebReflection/wru] based (tests)[https://github.com/WebReflection/es6-collections/blob/master/tests/es6-collections.js]
  * completely private shared behavior in order to easily maintain and update three collections at once

Alternatives
------------
  * the bigger and rich of dependencies (shim from Mark S. Miller)[http://code.google.com/p/es-lab/source/browse/trunk/src/ses/WeakMap.js], the best attempt to avoid undesired memory leasks
  * the unfortunately slower and heavier, memory usage speaking, alternative from (Benvie Harmony Collections Shim)[https://github.com/Benvie/ES6-Harmony-Collections-Shim]

Tests
-----
To run tests via **node.js** from the root folder of this project simply write `node tests/console.js`.
To run tests via **Rhino** from the root folder of this project simply write 'java -jar builder/jar/js.jar tests/console.js'.
To run test via **browser** simply drag and drop **tests/web.html** file.