import {User} from "../shared/models/user";
export interface UiState {

	user: User;
	showLoginModal: boolean;
	showSignupModal: boolean;
	errors: {[type: string]: string[]};

}

export const INITIAL_UI_STATE: UiState = {

	user: undefined,
	showLoginModal: false,
	showSignupModal: false,
	errors: {}

};
