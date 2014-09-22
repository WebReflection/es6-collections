var assert = require('better-assert');
// require('../index');
require('../es6-collections');

describe('ES Collections test', function(){
  it("WeakMap existence", function () {
    assert(WeakMap);
  });

  it("WeakMap constructor behavior", function () {
    assert(new WeakMap instanceof WeakMap);
    assert(WeakMap() instanceof WeakMap);
    if ("__proto__" in {}) {
      assert(WeakMap().__proto__.isPrototypeOf(WeakMap()));
      assert(WeakMap().__proto__ === WeakMap.prototype);
    }
  });

  it("WeakMap#has", function () {
    var
      o = WeakMap(),
      generic = {},
      callback = function () {}
    ;
    assert(false === o.has(callback));
    o.set(callback, generic);
    assert(true === o.has(callback));
  });

  it("WeakMap#get", function () {
    var
      o = WeakMap(),
      generic = {},
      callback = function () {}
    ;
    //:was assert(o.get(callback, 123) === 123);
    o.set(callback, generic);
    assert(o.get(callback, 123) === generic);
    assert(o.get(callback) === generic);
  });

  it("WeakMap#set", function () {
    var
      o = WeakMap(),
      generic = {},
      callback = function () {}
    ;
    o.set(callback, generic);
    assert(o.get(callback) === generic);
    o.set(callback, callback);
    assert(o.get(callback) === callback);
    o.set(callback, o);
    assert(o.get(callback) === o);
    o.set(o, callback);
    assert(o.get(o) === callback);
  });

  it("WeakMap#['delete']", function () {
    var
      o = WeakMap(),
      generic = {},
      callback = function () {}
    ;
    o.set(callback, generic);
    o.set(generic, callback);
    o.set(o, callback);
    assert(o.has(callback) && o.has(generic) && o.has(o));
    o["delete"](callback);
    o["delete"](generic);
    o["delete"](o);
    assert(!o.has(callback) && !o.has(generic) && !o.has(o));
    assert(o["delete"](o) === false);
    o.set(o, callback);
    assert(o["delete"](o));
  });

  it("non object key throws an error", function () {
    var o = WeakMap();
    try {
      o.set("key", o);
      assert(false);
    } catch(emAll) {
      assert(true);
    }
  });

  it("Map existence", function () {
    assert(Map);
  });

  it("Map constructor behavior", function () {
    assert(new Map instanceof Map);
    assert(Map() instanceof Map);
    if ("__proto__" in {}) {
      assert(Map().__proto__.isPrototypeOf(Map()));
      assert(Map().__proto__ === Map.prototype);
    }
  });

  it("Map#size - Mozilla only", function () {
    var
      o = Map()
    ;
    if ("size" in o) {
      assert(o.size() === 0);
      o.set("a", "a");
      assert(o.size() === 1);
      o["delete"]("a");
      assert(o.size() === 0);
    }
  });

  it("Map#has", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    assert(false === o.has(callback));
    o.set(callback, generic);
    assert(true === o.has(callback));
  });

  it("Map#get", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    //:was assert(o.get(callback, 123) === 123);
    o.set(callback, generic);
    assert(o.get(callback, 123) === generic);
    assert(o.get(callback) === generic);
  });

  it("Map#set", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    o.set(callback, generic);
    assert(o.get(callback) === generic);
    o.set(callback, callback);
    assert(o.get(callback) === callback);
    o.set(callback, o);
    assert(o.get(callback) === o);
    o.set(o, callback);
    assert(o.get(o) === callback);
    o.set(NaN, generic);
    assert(o.has(NaN));
    assert(o.get(NaN) === generic);
    o.set("key", undefined);
    assert(o.has("key"));
    assert(o.get("key") === undefined);

    o.set(-0, callback);
    o.set(0, generic);
    assert(o.has(-0));
    assert(o.get(-0) === callback);
    assert(o.has(0));
    assert(o.get(0) === generic);
  });

  it("Map#['delete']", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    o.set(callback, generic);
    o.set(generic, callback);
    o.set(o, callback);
    assert(o.has(callback) && o.has(generic) && o.has(o));
    o["delete"](callback);
    o["delete"](generic);
    o["delete"](o);
    assert(!o.has(callback) && !o.has(generic) && !o.has(o));
    assert(o["delete"](o) === false);
    o.set(o, callback);
    assert(o["delete"](o));
  });

  it("non object key does not throw an error", function () {
    var o = Map();
    try {
      o.set("key", o);
      assert(true);
    } catch(emAll) {
      assert(false);
    }
  });

  it("keys and values behavior", function () {
    var o = Map();
    o.set("key", "value");
    if ("keys" in o) {
      assert(o.keys() instanceof Array);
      assert(o.keys().length === 1);
      assert(o.keys()[0] === "key");
      assert(o.keys(1).join("") === o.keys().join(""));
    }
    if ("values" in o) {
      assert(o.values() instanceof Array);
      assert(o.values().length === 1);
      assert(o.values()[0] === "value");
      assert(o.values(1).join("") === o.values().join(""));
    }
  });

  it("Map#forEach", function () {
    var o = Map(), i;
    o.set("key 0", 0);
    o.set("key 1", 1);
    if ("forEach" in o) {
      o.forEach(function (key, value, obj) {
        assert(key === "key " + value);
        assert(obj === o);
        // even if dropped, keeps looping
        o["delete"](key);
      });
      assert(!o.keys().length);
    }
  });

  it("Map#clear", function(){
    var o = Map();
    o.set(1, '1');
    o.set(2, '2');
    o.set(3, '3');
    o.clear();
    assert(!o.size());
    assert(!o.values().length);
  });

  it("Set existence", function () {
    assert(Set);
  });

  it("Set constructor behavior", function () {
    assert(new Set instanceof Set);
    assert(Set() instanceof Set);
    if ("__proto__" in {}) {
      assert(Set().__proto__.isPrototypeOf(Set()));
      assert(Set().__proto__ === Set.prototype);
    }
  });

  it("Set#size - Mozilla only", function () {
    var
      o = Set()
    ;
    if ("size" in o) {
      assert(o.size() === 0);
      o.add("a");
      assert(o.size() === 1);
      o["delete"]("a");
      assert(o.size() === 0);
    }
  });

  it("Set#add", function () {
    var o = Set();
    assert(o.add(NaN) === undefined);
    assert(o.has(NaN));
  });

  it("Set#['delete']", function () {
    var
      o = Set(),
      generic = {},
      callback = function () {}
    ;
    o.add(callback);
    o.add(generic);
    o.add(o);
    assert(o.has(callback) && o.has(generic) && o.has(o));
    o["delete"](callback);
    o["delete"](generic);
    o["delete"](o);
    assert(!o.has(callback) && !o.has(generic) && !o.has(o));
    assert(o["delete"](o) === false);
    o.add(o);
    assert(o["delete"](o) === true);
  });

  it("values behavior", function () {
    var o = Set();
    o.add("value");
    if ("values" in o) {
      assert(o.values() instanceof Array);
      assert(o.values().length === 1);
      assert(o.values()[0] === "value");
      assert(o.values(1).join("") === o.values().join(""));
    }
  });

  it("Set#has", function () {
    var
      o = Set(),
      generic = {},
      callback = function () {}
    ;
    assert(false === o.has(callback));
    o.add(callback);
    assert(true === o.has(callback));
  });

  it("Set#forEach", function () {
    var o = Set(), i = 0;
    o.add("value 0");
    o.add("value 1");
    if ("forEach" in o) {
      o.forEach(function (value, sameValue, obj) {
        assert(value === "value " + i++);
        assert(obj === o);
        assert(value === sameValue);
        // even if dropped, keeps looping
        o["delete"](value);
      });
      assert(!o.values().length);
    }
  });

  it("Set#clear", function(){
    var o = Set();
    o.add(1);
    o.add(2);
    o.clear();
    assert(!o.size());
    assert(!o.values().length);
  });
});