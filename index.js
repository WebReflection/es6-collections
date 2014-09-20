(function (exports) {'use strict';
  if (typeof WeakMap == 'undefined') {
    var WeakMap = function() {
      if (!this || this.constructor !== WeakMap) return new WeakMap;
      this._keys = [];
      this._values = [];
      this.objectOnly = true;
    }
    WeakMap.prototype = {
      constructor: WeakMap,
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // WeakMap#get(key:void*):void*
      get: sharedGet,
      // WeakMap#has(key:void*):boolean
      has: sharedHas,
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
    }
    Map.prototype = {
      constructor: Map,
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      //:was Map#get(key:void*[, d3fault:void*]):void*
      // Map#has(key:void*):boolean
      has: sharedHas,
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
    }
    Set.prototype = {
      constructor: Set,
      // Set#has(value:void*):boolean
      has: sharedHas,
      // Set#add(value:void*):boolean
      add: Set_add,
      // Set#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // Set#size(void):number === Mozilla only
      size: sharedSize,
      // Set#values(void):Array === not in specs
      values: sharedValues,
      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
      forEach: Set_iterate
    };
    exports.Set = Set;
  }

  if (typeof WeakSet == 'undefined') {
    var WeakSet = function() {
      if (!this || this.constructor !== WeakSet) return new WeakSet;
      this._keys = [];
      this._values = [];
      this.objectOnly = true;
    }

    WeakSet.prototype = {
      constructor: WeakSet,
      // WeakSet#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakSet#add(value:void*):boolean
      add: Set_add,
      // WeakSet#clear():
      clear: sharedClear,
      // WeakSet#has(value:void*):boolean
      has: sharedHas
    };
    exports.WeakSet = WeakSet;
  }

  //shortcuts
  var i;


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

  function sharedHas(key) {
    if (this.objectOnly && key !== Object(key))
      throw new TypeError("not a non-null object")
    ;
    i = this._keys.indexOf(key);
    return -1 < i;
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

  function sharedSize(keys) {
    return this._keys.length;
  }

  function sharedIterate(callback, context) {
    var self = this;
    self._keys.forEach(function(key, n){
      callback.call(context, key, self._values[n]);
    });
  }

  function Set_iterate(callback, context) {
    self._values.forEach(function(value){
      callback.call(context, value);
    });
  }

  /** Set#add recycled through bind per each instanceof Set */
  function Set_add(value) {
    !this.has(value) && !!this._values.push(value);
  }

})(typeof exports == 'undefined' ? window : global);