import React from 'react';

import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';

import AuthForm from './AuthForm.jsx';
import CarsGrid from './CarsGrid.jsx';

function getStateFromFlux() {
    return {
        isAuth: AppStore.isAuth(),
        user: AppStore.getUser(),
        isLoading: AppStore.isLoading(),
        cars: AppStore.getCars()
    };
}

const App = React.createClass({
  getInitialState() {
	return getStateFromFlux();
  },
  
  componentWillMount() {
  },
  componentDidMount() {
      AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
      AppStore.removeChangeListener(this._onChange);
  },
  
  handleAuthSubmit(authData) {
	  AppActions.Auth(authData);
  },
  
  handleLogout() {
	  AppActions.Logout();
  },
  
  render() {
	return (    	
		<div>
            <AuthForm isAuth={this.state.isAuth} user={this.state.user} onAuthSubmit={this.handleAuthSubmit} onLogout={this.handleLogout} />
			<CarsGrid isAuth={this.state.isAuth} cars={this.state.cars} />
    	</div>
    );
  },

  _onChange() {
      this.setState(getStateFromFlux());
  }
});

export default App;