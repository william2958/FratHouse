import {ApplicationState} from "../application-state";
export function usernameSelector(state: ApplicationState): string {

	if (state.uiState.user) {
		return state.uiState.user.username;
	} else {
		return '';
	}

}
