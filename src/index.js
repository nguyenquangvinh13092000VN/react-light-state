import React from 'react';
import Store from './Store'

export default class ReactLightState {
  constructor(initState) {
    this.initState = initState;
    this.store = new Store(initState);
  }

  setDoto(doto) {
    this.store.setData(doto);
  }

  getDoto() {
    return this.store.getValue();
  }

  withLight(Component, props) {
    const store = this.store;
    const initState = this.initState;
    return class extends React.Component {
      constructor() {
        this.state = initState;
      }
      componentDidMount() {
        store.subscribe(data => {
          this.setState({ ...data })
        })
      }

      render() {
        return <Component {...this.state} {...props} />
      }
    }
  }
}