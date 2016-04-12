var React = require("react");
var ReactDOM = require('react-dom');
var AppStore = require("../stores/AppStore");
var AppAction = require("../actions/AppActions");

var App = React.createClass({
    _sequenceID: 0,
    getInitialState: function () {
        return {
            items: AppStore.getAll()
        }
    },
    componentDidMount: function () {
        /**
         * 完成渲染后，对Store绑定change事件
         */
        AppStore.addChangeListener(this.storeChanged);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this.storeChanged);
    },
    /**
     * 当Store发生变化，重新渲染
     */
    storeChanged: function () {
        this.setState({
            items: AppStore.getAll()
        });
    },
    createNewItems: function (e) {
        if (e.key == 'Enter') {
            e.preventDefault();
            this._sequenceID++;
            var currentDom = ReactDOM.findDOMNode(this.refs.key);
            var keyValue = currentDom.value.trim();
            if (keyValue == "") {
                currentDom.value = "";
                return;
            }
            currentDom.value = "";
            /**
             * 抛给事件分发器处理
             */
            AppAction.add({
                key: keyValue,
                id: this._sequenceID
            })
        }
    },
    removeItems: function (id) {
        /**
         * 抛给事件分发器处理
         */
        AppAction.remove(id);
    },
    render: function () {
        var items = this.state.items;
        var elements = items.map(function (value, index) {
            return (
                <li key={value.id}>
                    <span>{value.key}</span> ,
                    <a href="javascript:" onClick={ this.removeItems.bind(this,value.id)}>删除</a>
                </li>
            )
        }.bind(this));

        return (
            <div id="main-container">
                <ul className="key-list">
                    {elements}
                </ul>

                <div>
                    <form className="pure-form">
                        <fieldset>
                            <input type="text" className="item-input" onKeyPress={this.createNewItems} ref="key"/>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = App;