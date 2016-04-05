var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var keyStore = require('../stores/AppStore');

/**
 * 注册事件分发器
 */
AppDispatcher.register(function (event) {
    switch (event.eventName) {

        case 'new-item':
            keyStore.addItem(event.item);
            //触发Store change
            keyStore.emitChange();
            break;

        case 'remove-item':
            keyStore.removeItem(event.item);
            //触发Store change
            keyStore.emitChange();
            break;
    }
});

module.exports = AppDispatcher;