import {HouseData} from "../house-data";
import {Action} from "@ngrx/store";
import {HOUSES_LOADED_ACTION, HousesLoadedAction} from "../actions/houseActions";
import * as _ from 'lodash';

export function houseData(state: HouseData, action: Action): HouseData {

	switch (action.type) {

		case HOUSES_LOADED_ACTION:
			return handleHousesLoadedAction(state, action);

		default:
			return state;

	}

}

function handleHousesLoadedAction(state: HouseData, action: HousesLoadedAction): HouseData {
	const newHouseData = _.cloneDeep(state);
	newHouseData.houses = [];
	console.log('writing new houses to the store: ', action.payload);
	for (const house of action.payload) {
		if (!(house.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			house.key = house.$key;
			newHouseData.houses.push(house);
		}
	}
	return newHouseData;
}
