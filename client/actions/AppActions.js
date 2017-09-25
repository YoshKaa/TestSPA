import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const AppActions = {
    Auth(authData) {
        AppDispatcher.dispatch({
            type: Constants.USER_AUTH_REQUEST
        });

        api.getAuth(authData)
        .then(({ data }) => {
			AppDispatcher.dispatch({
                type: Constants.USER_AUTH_SUCCESS,
                user: data
            });
			
			var tempUserId = data.map( function(user){
				  return {
				    id: user.id,
				    login: user.login
				  };
			    } 
               );
			if(tempUserId.length != 0){ this.loadCars(tempUserId[0]['id']);	}
			
			}
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.USER_AUTH_FAIL,
                error: err
            })
        );		
    },
	
	Logout() {
        AppDispatcher.dispatch({
            type: Constants.USER_LOGOUT
        });
	},
	
	loadCars(userId) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_CARS_REQUEST
        });

        api.listCars(userId)
        .then(({ data }) => 
			AppDispatcher.dispatch({
                type: Constants.LOAD_CARS_SUCCESS,
                cars: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CARS_FAIL,
                error: err
            })
        );
    }
};

export default AppActions;