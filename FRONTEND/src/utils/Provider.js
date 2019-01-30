import React, { Component } from 'React';
import { Context } from './withContext';

class Provider extends Component {

  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({
      user
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          setUser: this.setUser,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider;