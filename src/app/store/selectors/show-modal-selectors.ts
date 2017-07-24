import {ApplicationState} from "../application-state";
import {LOGIN_ERROR, SIGNUP_ERROR} from "../actions/globalActions";

export function showLoginSelector(state: ApplicationState): boolean {

	return state.uiState.showLoginModal;

}

export function showSignupSelector(state: ApplicationState): boolean {

	return state.uiState.showSignupModal;

}

export function loginErrorsSelector(state: ApplicationState): string[] {

	return state.uiState.errors[LOGIN_ERROR];

}

export function signupErrorsSelector(state: ApplicationState): string[] {

	return state.uiState.errors[SIGNUP_ERROR];

}
