(function (exports) {'use strict';
  if (typeof WeakMap == 'undefined') {
    var WeakMap = createCollection(true);
    WeakMap.prototype = {
      constructor: WeakMap,
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakMap#clear():
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
    var Map = createCollection();
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
      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
      forEach: sharedForEach,
      // Map#clear():
      clear: sharedClear
    };
    exports.Map = Map;
  }

  if (typeof Set == 'undefined') {
    var Set =createCollection();
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
    var WeakSet = createCollection(true);
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


  /**
   * ES6 collection constructor
   * @return {Function} a collection constructor
   */
  function createCollection(objectOnly){
    return function Collection(a){
      if (!this || this.constructor !== Collection) return new Collection(a);
      this._keys = [];
      this._values = [];
      this.objectOnly = objectOnly;

      //parse initial iterable argument passed
      if (a) init.call(this, a);
    };
  }


  //shared pointer
  var i;
  var is = Object.is;


  /** parse initial iterable argument passed */
  function init(a){
    //init Set argument, like `[1,2,3,{}]`
    if (this.add)
      for (var i = a.length; i--; this.add(a[i]));
    //init Map argument like `[[1,2], [{}, 4]]`
    else
      for (var i = a.length; i--; this.set(a[i][0], a[i][1]));
  }


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

  function sharedForEach(callback, context) {
    var self = this;
    var values = self._values.slice();
    self._keys.slice().forEach(function(key, n){
      callback.call(context, key, values[n], self);
    });
  }

  function sharedSetIterate(callback, context) {
    var self = this;
    self._values.slice().forEach(function(value){
      callback.call(context, value, value, self);
    });
  }

  /** Set#add recycled through bind per each instanceof Set */
  function sharedSetAdd(value) {
    !this.has(value) && !!this._values.push(value);
  }

})(typeof exports == 'undefined' ? window : global);