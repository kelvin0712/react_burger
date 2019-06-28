import {put, delay} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

// import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const authData = {
			email: action.email,
			password: action.password,
			returnSecureToken: true
		};
	let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCQ2O2eUO52j_lNSCY4yEF_B64XyB5FpBA';
	if(!action.isSignUp) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCQ2O2eUO52j_lNSCY4yEF_B64XyB5FpBA';
		}

	try {	
	const response = yield axios.post(url, authData)
		
	const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
	yield localStorage.setItem('token', response.data.idToken);
	yield localStorage.setItem('expirationDate', expirationDate);
	yield localStorage.setItem('userId', response.data.localId)
	yield put(actions.authSuccess(response.data.idToken, response.data.localId)); 
	yield put(actions.checkAuthTimeout(response.data.expiresIn))
 	} catch(error) {
 		yield put(actions.authFail(error.response.data.error));
 	}
}

export function*  authCheckStateSaga(action) {
	 const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                yield put(actions.logout());
            } else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
} 
}
