import React from 'react';
import Store from './Store'
import mapStateToPropsDefault from './utils/mapStateToProps';

export default class ReactLightState {
  constructor(initState, storeName) {
    this.initState = initState;
    this.storeName = storeName;
    this.store = new Store(initState);

    this.setState = this.setState.bind(this);
    this.getState = this.getState.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.resetState = this.resetState.bind(this);
    this.boomerang = this.boomerang.bind(this);
    this.withLight = this.withLight.bind(this);
  }

  setState (data) {
    this.store.setData(data);
  }

  getState () {
    return this.store.getData();
  }

  subscribe (cb) {
    this.store.subscribe(cb);
    return cb;
  }

  unsubscribe(cb) {
    return this.store.unsubscribe(cb);
  }

  /**
   * Reset the `LightState` data to `initState` data.
   */
  resetState () {
    this.store.setData(this.initState);
  }

  /**
   * Like a `Boomerang`, the data changed to to new value
   * after `duration` time will reset to previous value.
   * 
   * @param {Object} data The data want to boomerang to.
   * @param {Integer} duration
   */
  boomerang (data, duration, times) {
    if (this.boomeranging) return;
    // prevent if `boomeranging`
    this.boomeranging = true;
    var currentData = this.store.getData();
    this.setState(data)
    setTimeout(() => {
      this.setState(currentData);
      this.boomeranging = false;
    }, duration);
  }

  /**
   * A HOC, like `connect` in `react-redux`
   * @param {function} mapStateToProps An object to map `lightState` value to your props
   */
  withLight (mapStateToProps = mapStateToPropsDefault) {
    const store = this.store;
    const initState = this.initState;
    const storeName = this.storeName;
    return function (Component, props) {
      return class extends React.Component {
        constructor() {
          super()
          this.state = initState;
        }
        componentDidMount() {
          store.subscribe(data => {
            this.setState({ ...data })
          })
        }
        componentWillUnmount() {
          store.unSubscribeAll();
        }
        render() {
          return <Component {...mapStateToProps(this.state, storeName)} {...props} />
        }
      }
    }
  }
}