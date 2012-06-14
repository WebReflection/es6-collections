function wru(wru){
  var assert = wru.assert, async = wru.async;
  wru.test([{
      name: "WeakMap existence",
      test: function () {
        assert(WeakMap);
      }
    }, {
      name: "WeakMap constructor behavior",
      test: function () {
        assert(new WeakMap instanceof WeakMap);
        assert(WeakMap() instanceof WeakMap);
        if ("__proto__" in {}) {
          assert("__proto__", WeakMap().__proto__.isPrototypeOf(WeakMap()));
          assert("same prototype", WeakMap().__proto__ === WeakMap.prototype);
        }
      }
    }, {
      name: "WeakMap#has",
      test: function () {
        var
          o = WeakMap(),
          generic = {},
          callback = function () {}
        ;
        assert("not there yet", false === o.has(callback));
        o.set(callback, generic);
        assert("now it has it", true === o.has(callback));
      }
    }, {
      name: "WeakMap#get",
      test: function () {
        var
          o = WeakMap(),
          generic = {},
          callback = function () {}
        ;
        //:was assert("default", o.get(callback, 123) === 123);
        o.set(callback, generic);
        assert("generic with default", o.get(callback, 123) === generic);
        assert("generic without default", o.get(callback) === generic);
      }
    }, {
      name: "WeakMap#set",
      test: function () {
        var
          o = WeakMap(),
          generic = {},
          callback = function () {}
        ;
        o.set(callback, generic);
        assert("generic", o.get(callback) === generic);
        o.set(callback, callback);
        assert("callback", o.get(callback) === callback);
        o.set(callback, o);
        assert("o", o.get(callback) === o);
        o.set(o, callback);
        assert("callback", o.get(o) === callback);
      }
    }, {
      name: "WeakMap#['delete']",
      test: function () {
        var
          o = WeakMap(),
          generic = {},
          callback = function () {}
        ;
        o.set(callback, generic);
        o.set(generic, callback);
        o.set(o, callback);
        assert("has all of them", o.has(callback) && o.has(generic) && o.has(o));
        o["delete"](callback);
        o["delete"](generic);
        o["delete"](o);
        assert("has none of them", !o.has(callback) && !o.has(generic) && !o.has(o));
        assert("if not found, returns false", o["delete"](o) === false);
        o.set(o, callback);
        assert("if found and removed returns true", o["delete"](o));
      }
    }, {
      name: "non object key throws an error",
      test: function () {
        var o = WeakMap();
        try {
          o.set("key", o);
          assert(false);
        } catch(emAll) {
          assert(true);
        }
      }
    }, {
      name: "Map existence",
      test: function () {
        assert(Map);
      }
    }, {
      name: "Map constructor behavior",
      test: function () {
        assert(new Map instanceof Map);
        assert(Map() instanceof Map);
        if ("__proto__" in {}) {
          assert("__proto__", Map().__proto__.isPrototypeOf(Map()));
          assert("same prototype", Map().__proto__ === Map.prototype);
        }
      }
    },{
      name: "Map#size - Mozilla only",
      test: function () {
        var
          o = Map()
        ;
        if ("size" in o) {
          assert("initial size is 0", o.size() === 0);
          o.set("a", "a");
          assert("size reflects internal keys length", o.size() === 1);
          o["delete"]("a");
          assert("after deleting size is 0 again", o.size() === 0);
        }
      }
    },{
      name: "Map#has",
      test: function () {
        var
          o = Map(),
          generic = {},
          callback = function () {}
        ;
        assert("not there yet", false === o.has(callback));
        o.set(callback, generic);
        assert("now it has it", true === o.has(callback));
      }
    }, {
      name: "Map#get",
      test: function () {
        var
          o = Map(),
          generic = {},
          callback = function () {}
        ;
        //:was assert("default", o.get(callback, 123) === 123);
        o.set(callback, generic);
        assert("generic with default", o.get(callback, 123) === generic);
        assert("generic without default", o.get(callback) === generic);
      }
    }, {
      name: "Map#set",
      test: function () {
        var
          o = Map(),
          generic = {},
          callback = function () {}
        ;
        o.set(callback, generic);
        assert("generic", o.get(callback) === generic);
        o.set(callback, callback);
        assert("callback", o.get(callback) === callback);
        o.set(callback, o);
        assert("o", o.get(callback) === o);
        o.set(o, callback);
        assert("callback", o.get(o) === callback);
        o.set(NaN, generic);
        assert("NaN as valid key", o.has(NaN));
        assert("NaN key returns expected value", o.get(NaN) === generic);
        o.set("key", undefined);
        assert("undefined value is stored", o.has("key"));
        assert("undefined value is retrieved", o.get("key") === undefined);
        
        o.set(-0, callback);
        o.set(0, generic);
        assert("-0 as valid key", o.has(-0));
        assert("-0 returns the expected value", o.get(-0) === callback);
        assert("0 as valid key", o.has(0));
        assert("0 returns the expected value", o.get(0) === generic);
      }
    }, {
      name: "Map#['delete']",
      test: function () {
        var
          o = Map(),
          generic = {},
          callback = function () {}
        ;
        o.set(callback, generic);
        o.set(generic, callback);
        o.set(o, callback);
        assert("has all of them", o.has(callback) && o.has(generic) && o.has(o));
        o["delete"](callback);
        o["delete"](generic);
        o["delete"](o);
        assert("has none of them", !o.has(callback) && !o.has(generic) && !o.has(o));
        assert("if not found, returns false", o["delete"](o) === false);
        o.set(o, callback);
        assert("if found and removed returns true", o["delete"](o));
      }
    }, {
      name: "non object key does not throw an error",
      test: function () {
        var o = Map();
        try {
          o.set("key", o);
          assert(true);
        } catch(emAll) {
          assert(false);
        }
      }
    }, {
      name: "keys and values behavior",
      test: function () {
        var o = Map();
        o.set("key", "value");
        if ("keys" in o) {
          assert("keys as array", o.keys() instanceof Array);
          assert("only one key", o.keys().length === 1);
          assert("key is correct", o.keys()[0] === "key");
          assert("no slice", o.keys(1).join("") === o.keys().join(""));
        }
        if ("values" in o) {
          assert("values as array", o.values() instanceof Array);
          assert("only one value", o.values().length === 1);
          assert("value is correct", o.values()[0] === "value");
          assert("no slice", o.values(1).join("") === o.values().join(""));
        }
      }
    }, {
      name: "Map#iterate",
      test: function () {
        var o = Map(), i;
        o.set("key 0", "value 0");
        o.set("key 1", "value 1");
        if ("iterate" in o) {
          o.iterate(function (key, value, index) {
            assert("correct key", key === "key " + index);
            assert("correct value", value === "value " + index);
            assert("correct index", i == null ? index === 0 : index === 1);
            i = index;
            // even if dropped, keeps looping
            o["delete"](key);
          });
          assert("looped twice", i === 1);
          assert("o is empty", !o.keys().length);
        }
      }
    }, {
      name: "Set existence",
      test: function () {
        assert(Set);
      }
    }, {
      name: "Set constructor behavior",
      test: function () {
        assert(new Set instanceof Set);
        assert(Set() instanceof Set);
        if ("__proto__" in {}) {
          assert("__proto__", Set().__proto__.isPrototypeOf(Set()));
          assert("same prototype", Set().__proto__ === Set.prototype);
        }
      }
    },{
      name: "Set#size - Mozilla only",
      test: function () {
        var
          o = Set()
        ;
        if ("size" in o) {
          assert("initial size is 0", o.size() === 0);
          o.add("a");
          assert("size reflects internal values length", o.size() === 1);
          o["delete"]("a");
          assert("after deleting size is 0 again", o.size() === 0);
        }
      }
    }, {
      name: "Set#add",
      test: function () {
        var o = Set();
        assert("add returns undefined", o.add(NaN) === undefined);
        assert("once added, value is stored", o.has(NaN));
      }
    }, {
      name: "Set#['delete']",
      test: function () {
        var
          o = Set(),
          generic = {},
          callback = function () {}
        ;
        o.add(callback);
        o.add(generic);
        o.add(o);
        assert("has all of them", o.has(callback) && o.has(generic) && o.has(o));
        o["delete"](callback);
        o["delete"](generic);
        o["delete"](o);
        assert("has none of them", !o.has(callback) && !o.has(generic) && !o.has(o));
        assert("if not found, returns false", o["delete"](o) === false);
        o.add(o);
        assert("if found and removed returns true", o["delete"](o) === true);
      }
    }, {
      name: "values behavior",
      test: function () {
        var o = Set();
        o.add("value");
        if ("values" in o) {
          assert("values as array", o.values() instanceof Array);
          assert("only one value", o.values().length === 1);
          assert("value is correct", o.values()[0] === "value");
          assert("no slice", o.values(1).join("") === o.values().join(""));
        }
      }
    }, {
      name: "Set#has",
      test: function () {
        var
          o = Set(),
          generic = {},
          callback = function () {}
        ;
        assert("not there yet", false === o.has(callback));
        o.add(callback);
        assert("now it has it", true === o.has(callback));
      }
    }, {
      name: "Set#iterate",
      test: function () {
        var o = Set(), i;
        o.add("value 0");
        o.add("value 1");
        if ("iterate" in o) {
          o.iterate(function (value, index) {
            assert("correct value", value === "value " + index);
            assert("correct index", i == null ? index === 0 : index === 1);
            i = index;
            // even if dropped, keeps looping
            o["delete"](value);
          });
          assert("looped twice", i === 1);
          assert("o is empty", !o.values().length);
        }
      }
  }]);

}