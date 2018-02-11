import {ApplicationState} from "../application-state";
import {SET_USERNAME_ERROR} from "../actions/globalActions";

export function usernameErrorsSelector(state: ApplicationState): string[] {

	return state.uiState.errors[SET_USERNAME_ERROR];

}
