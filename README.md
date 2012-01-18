ES6 Harmony Collections Fast Polyfill
===========================================

The aim of this repository is to provide a **performances oriented** shim for ES6 collections such **WeakMap**, **Map**, and **Set**.

These global functions are already available in Firefox Nightly and Chrome Dev channel through *Enable Experimental JavaScript* in *chrome://flags/* section.


Features
--------
  * compatible with **all browsers** and both **node.js** (`npm install es6-collections`) and **Rhino**
  * unobtrusive with any environment. If implemented in node V8 it exports native constructors rather than shims
  * **size and performances oriented** polyfill. It does not matter if the WeakMap is not perfect, it's just fast and not much more memory leaks prone than other shims. If you don't rely in magic, simply remember to `wm.delete(referedObject)` when *referedObject* is not needed anymore.
  * for browsers, it fits in **less than 1Kb** [once minzipped](https://github.com/WebReflection/es6-collections/blob/master/build/es6-collections.min.js) ... the smallest shim out there so far
  * 100% of code coverage through [Web](https://github.com/WebReflection/es6-collections/blob/master/tests/web.html) or [console](https://github.com/WebReflection/es6-collections/blob/master/tests/console.js) [wru](https://github.com/WebReflection/wru) based [tests](https://github.com/WebReflection/es6-collections/blob/master/tests/es6-collections.js)
  * completely private shared behavior in order to easily maintain and update three collections at once


Alternatives
------------
  * the bigger and rich of dependencies [shim from Mark S. Miller](http://code.google.com/p/es-lab/source/browse/trunk/src/ses/WeakMap.js), the best attempt to avoid undesired memory leasks. Bear in mind while this shim is better leaks speaking, **it's simply not possible to avoid 100% leaks in ES5**.
  * the unfortunately slower and heavier, memory usage speaking, still leaks prone alternative from [Benvie Harmony Collections Shim](https://github.com/Benvie/ES6-Harmony-Collections-Shim)


Tests
-----
To run tests via **node.js** from the root folder of this project simply write `node tests/console.js`.
To run tests via **Rhino** from the root folder of this project simply write 'java -jar builder/jar/js.jar tests/console.js'.
To run test via **browser** simply drag and drop **tests/web.html** file.


Build
-----
To build the browser version from the root of this project folder simply write `python builder/build.py`.


License
=======

*es6-collections* and the rest of the project is under Mit Style License

    Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.


Why
---
There is a difference between *I need it* and *I need it only if 100% the same of the native version*.
Since **almost no shim in JavaScript world is 100% compatible with the native implementation**, you can choose to use at least a fast shim which aim is to bring the same API using best practices to both minify and boost up JS performances.
If you think this is not good for you then wait until these collections are available natively and don't even bother.
