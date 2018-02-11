import {Action} from "@ngrx/store";
import {BasicUser, User} from "../../shared/models/user";
import {House} from "../../shared/models/house";

export const LOAD_HOUSES_ACTION = 'LOAD_HOUSES_ACTION';
export const HOUSES_LOADED_ACTION = 'HOUSES_LOADED_ACTION';
export const CREATE_HOUSE_ACTION = 'CREATE_HOUSE_ACTION';
export const ADD_USER_TO_HOUSE_ACTION = 'ADD_USER_TO_HOUSE_ACTION';
export const REMOVE_USER_FROM_HOUSE_ACTION = 'REMOVE_USER_FROM_HOUSE_ACTION';
export const DELETE_HOUSE_ACTION = 'DELETE_HOUSE_ACTION';

export class LoadHousesAction implements Action {
	type = LOAD_HOUSES_ACTION;
	constructor(public payload?: string) { }
}

export class HousesLoadedAction implements Action {
	type = HOUSES_LOADED_ACTION;
	constructor(public payload?: any) { }
}

export interface CreateHousePayload {
	user: User;
	selectedUsers: BasicUser[];
	houseName: string;
}
export class CreateHouseAction implements Action {
	type = CREATE_HOUSE_ACTION;
	constructor(public payload?: CreateHousePayload) { }
}

export interface AddUserToHousePayload {
	user: BasicUser;
	houseKey: string;
}
export class AddUserToHouseAction implements Action {
	type = ADD_USER_TO_HOUSE_ACTION;
	constructor(public payload?: AddUserToHousePayload) { }
}

export class RemoveUserFromHouseAction implements Action {
	type = REMOVE_USER_FROM_HOUSE_ACTION;
	constructor(public payload?: AddUserToHousePayload) { }
}

export class DeleteHouseAction implements Action {
	type = DELETE_HOUSE_ACTION;
	constructor(public payload?: House) { }
}
