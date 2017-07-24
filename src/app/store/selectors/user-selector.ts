import {ApplicationState} from "../application-state";
import {User} from "../../shared/models/user";
export function userSelector(state: ApplicationState): User {

	return state.uiState.user;

}
