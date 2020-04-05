import React, { Component } from 'react'

const loadable = (loader) => {
  return class LoadableComponent extends Component {
    state = {
      LoadableCpn: null
    }

    componentDidMount() {
      loader().then(rescpn => {
        this.setState({
          LoadableCpn: rescpn.default
        })
      })
    }

    render() {
      const { LoadableCpn } = this.state
      return (
        <div>
          {
            LoadableCpn ?
              <LoadableCpn />
              :
              <div>正在加载！！！</div>
          }
        </div>
      )
    }

  }
}

export default loadable

