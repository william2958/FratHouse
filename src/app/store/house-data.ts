import {House} from "../shared/models/house";

export interface HouseData {

	houses: House[];

}

export const INITIAL_HOUSE_DATA: HouseData = {

	houses: []

};
