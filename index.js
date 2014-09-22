(function (exports) {'use strict';
  if (typeof WeakMap == 'undefined') {
    var WeakMap = function() {
      if (!this || this.constructor !== WeakMap) return new WeakMap;
      this._keys = [];
      this._values = [];
      this.objectOnly = true;
    };
    WeakMap.prototype = {
      constructor: WeakMap,
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // WeakMap#get(key:void*):void*
      get: sharedGet,
      // WeakMap#has(key:void*):boolean
      has: mapHas,
      // WeakMap#set(key:void*, value:void*):void
      set: sharedSet
    };
    exports.WeakMap = WeakMap;
  }

  if (typeof Map == 'undefined') {
    var Map = function() {
      if (!this || this.constructor !== Map) return new Map;
      this._keys = [];
      this._values = [];
    };
    Map.prototype = {
      constructor: Map,
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      //:was Map#get(key:void*[, d3fault:void*]):void*
      // Map#has(key:void*):boolean
      has: mapHas,
      // Map#get(key:void*):boolean
      get: sharedGet,
      // Map#set(key:void*, value:void*):void
      set: sharedSet,
      // Map#size(void):number === Mozilla only so far
      size: sharedSize,
      // Map#keys(void):Array === not in specs
      keys: sharedKeys,
      // Map#values(void):Array === not in specs
      values: sharedValues,
      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, index) === not in specs`
      forEach: sharedIterate
    };
    exports.Map = Map;
  }

  if (typeof Set == 'undefined') {
    var Set = function() {
      if (!this || this.constructor !== Set) return new Set;
      this._keys = []; //stub
      this._values = []; //real storage
    };
    Set.prototype = {
      constructor: Set,
      // Set#has(value:void*):boolean
      has: setHas,
      // Set#add(value:void*):boolean
      add: sharedSetAdd,
      // Set#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // Set#size(void):number === Mozilla only
      size: sharedSize,
      // Set#values(void):Array === not in specs
      values: sharedValues,
      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
      forEach: sharedSetIterate
    };
    exports.Set = Set;
  }

  if (typeof WeakSet == 'undefined') {
    var WeakSet = function() {
      if (!this || this.constructor !== WeakSet) return new WeakSet;
      this._keys = [];
      this._values = [];
      this.objectOnly = true;
    };
    WeakSet.prototype = {
      constructor: WeakSet,
      // WeakSet#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakSet#add(value:void*):boolean
      add: sharedSetAdd,
      // WeakSet#clear():
      clear: sharedClear,
      // WeakSet#has(value:void*):boolean
      has: setHas
    };
    exports.WeakSet = WeakSet;
  }

  //shared pointer
  var i;
  var is = Object.is;

  /** delete */
  function sharedDelete(key) {
    if (this.has(key)) {
      this._keys.splice(i, 1);
      this._values.splice(i, 1);
    }
    // Aurora here does it while Canary doesn't
    return -1 < i;
  };

  function sharedGet(key) {
    return this.has(key) ? this._values[i] : undefined;
  }

  function has(list, key) {
    if (this.objectOnly && key !== Object(key))
      throw new TypeError("not a non-null object");
    //NaN or 0 passed
    if (key != key || key === 0) for (i = list.length; i-- && !is(list[i], key););
    else i = list.indexOf(key);
    return -1 < i;
  }

  function setHas(value) {
    return has.call(this, this._values, value);
  }

  function mapHas(value) {
    return has.call(this, this._keys, value);
  }

  function sharedSet(key, value) {
    this.has(key) ?
      this._values[i] = value
      :
      this._values[this._keys.push(key) - 1] = value
    ;
  }

  function sharedClear() {
    this._values.length = 0;
  }

  /** keys, values, and iterate related methods */
  function sharedValues() {
    return this._values.slice();
  }

  function sharedKeys() {
    return this._keys.slice();
  }

  function sharedSize() {
    return this._values.length;
  }

  function sharedIterate(callback, context) {
    var self = this;
    self._keys.forEach(function(key, n){
      callback.call(context, key, self._values[n]);
    });
  }

  function sharedSetIterate(callback, context) {
    self._values.forEach(function(value){
      callback.call(context, value);
    });
  }

  /** Set#add recycled through bind per each instanceof Set */
  function sharedSetAdd(value) {
    !this.has(value) && !!this._values.push(value);
  }

})(typeof exports == 'undefined' ? window : global);