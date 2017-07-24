import {ApplicationState} from "../application-state";
import {House} from "../../shared/models/house";

export function housesSelector(state: ApplicationState): House[] {

	return state.houseData.houses;

}
