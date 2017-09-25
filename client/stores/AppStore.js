import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppActions from '../actions/AppActions';

const CHANGE_EVENT = 'change';

let _user = [];
let _cars = [];
let _isAuth = false;
let _authError = null;
let _loadingError = null;
let _isLoading = true;

function formatUser(user) {
    return {
        id: user.id,
		login: user.login
    };
}

function formatCar(car) {
    return {
        id: car.id,
		user_id: car.user_id,
        model: car.model,
        permission: car.permission
    };
}

const AppStore = Object.assign({}, EventEmitter.prototype, {
    isAuth() {
        return _isAuth;
    },
	
    getUser() {
		return _user;
    },
	
    isLoading() {
        return _isLoading;
    },

    getCars() {
		return _cars;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.USER_AUTH_REQUEST: {
            _isLoading = true;

            AppStore.emitChange();
            break;
        }

        case AppConstants.USER_AUTH_SUCCESS: {
			_isLoading = false;
            _user = action.user.map( formatUser );
			_user.length?_isAuth=true:_isAuth=false;
            _authError = null;

            AppStore.emitChange();
            break;
        }

        case AppConstants.USER_AUTH_FAIL: {
		    _isAuth = false;
			_authError = action.error;

            AppStore.emitChange();
            break;
        }
		
        case AppConstants.LOAD_CARS_REQUEST: {
            _isLoading = true;

            AppStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CARS_SUCCESS: {
			_isLoading = false;
            _cars = action.cars.map( formatCar );
            _loadingError = null;

            AppStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CARS_FAIL: {
            _loadingError = action.error;

            AppStore.emitChange();
            break;
        }

        case AppConstants.USER_LOGOUT: {
            _isAuth = false;
            _user = [];
            _cars = [];
			
            AppStore.emitChange();
            break;
        }
        default: {
            console.log('No such handler');
        }
    }
});

export default AppStore;