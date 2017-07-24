import {Action} from "@ngrx/store";

export const LOAD_HOUSES_ACTION = 'LOAD_HOUSES_ACTION';
export const HOUSES_LOADED_ACTION = 'HOUSES_LOADED_ACTION';

export class LoadHousesAction implements Action {
	type = LOAD_HOUSES_ACTION;
	constructor(public payload?: string) { }
}

export class HousesLoadedAction implements Action {
	type = HOUSES_LOADED_ACTION;
	constructor(public payload?: any) { }
}
