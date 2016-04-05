var EventEmitter = require("events").EventEmitter;
var assign = require('object-assign');
var _ = require("underscore");

/**
 *
 * keyStore 继承EventEmitter
 */
var keyStore = assign({}, EventEmitter.prototype, {
    keys: [],
    addItem: function (item) {
        this.keys.push(item);
    },
    removeItem: function (item) {
        this.keys = _.filter(this.keys, function (value) {
            return value.id != item;
        })
    },
    getAll: function () {
        return this.keys;
    },
    emitChange: function () {
        //抛出change变化事件
        this.emit("change");
    },
    addChangeListener: function (callback) {
        //添加keyStore监听变化，一旦变化调用回调函数
        this.on("change", callback);
    },
    removeChangeListener: function (callback) {
        //移除keyStore监听
        this.removeListener("change", callback)
    }
});

module.exports = keyStore;