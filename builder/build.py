# JSBuilder http://code.google.com/p/javascript-builder/

copyright = '(C) @WebReflection - Mit Style License'

import JSBuilder, string, re

# HTML version
print ("")
print ("-----------------------")
print ("|   es6-collections   |")
print ("-----------------------")
JSBuilder.compile(
    copyright,
    'build/es6-collections.js',
    'build/es6-collections.min.js',
    [
        "es6-collections.js"
    ]
)
print ("----------------------")
print ("")

# let me read the result ...
import time
time.sleep(2)