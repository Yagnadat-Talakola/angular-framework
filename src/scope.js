'use strict';
var _ = require('lodash');

// gurantees to be unique, since JS functions are reference values. They're not considered equal to anything else but themselves.
function initWatchVal() { }
// $$ indicates that this variable should be considered private to the Angular framework
// and should not be called from the application code.
function Scope() {
  this.$$watchers = [];
  this.$$lastDirtyWatch = null;
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() { },
    last: initWatchVal
  };
  this.$$watchers.push(watcher);
  this.$$lastDirtyWatch = null;
};

Scope.prototype.$$digestOnce = function() {
  var self = this;
  var newValue, oldValue, dirty;
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self);
    oldValue = watcher.last;
    if (newValue !== oldValue) {
      self.$$lastDirtyWatch = watcher;
      watcher.last = newValue;
      watcher.listenerFn(newValue,
        (oldValue === initWatchVal ? newValue : oldValue),
        self);
      dirty = true;
    } else if (self.$$lastDirtyWatch === watcher) {
      return false; // explicitly returning false in a _.forEach loop causes LoDash to short circuit the loop and exit immediately.
    }
  });
  return dirty;
};

Scope.prototype.$digest = function() {
  var ttl = 10; // setting time to live (max iterations) to 10
  var dirty;
  this.$$lastDirtyWatch = null;
  do {
    dirty = this.$$digestOnce();
    if (dirty && !(ttl--)) {
      throw '10 digest iterations reached';
    }
  } while (dirty);
};

module.exports = Scope;
