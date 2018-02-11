import {Action} from "@ngrx/store";
import {BasicUser} from "app/shared/models/user";
export const LOAD_OUTSTANDING_EXPENSES_ACTION = 'LOAD_OUTSTANDING_EXPENSES_ACTION';
export const OUTSTANDING_EXPENSES_LOADED_ACTION = 'OUTSTANDING_EXPENSES_LOADED_ACTION';
export const LOAD_OWED_EXPENSES_ACTION = 'LOAD_OWED_EXPENSES_ACTION';
export const OWED_EXPENSES_LOADED_ACTION = 'OWED_EXPENSES_LOADED_ACTION';
export const LOAD_PAST_OUTSTANDING_EXPENSES_ACTION = 'LOAD_PAST_OUTSTANDING_EXPENSES_ACTION';
export const PAST_OUTSTANDING_EXPENSES_LOADED_ACTION = 'PAST_OUTSTANDING_EXPENSES_LOADED_ACTION';
export const LOAD_PAST_OWED_EXPENSES_ACTION = 'LOAD_PAST_OWED_EXPENSES_ACTION';
export const PAST_OWED_EXPENSES_LOADED_ACTION = 'PAST_OWED_EXPENSES_LOADED_ACTION';
export const LOAD_SINGLE_EXPENSE_ACTION = 'LOAD_SINGLE_EXPENSE_ACTION';
export const SINGLE_EXPENSE_LOADED_ACTION = 'SINGLE_EXPENSE_LOADED_ACTION';
export const CREATE_NEW_EXPENSE_ACTION = 'CREATE_NEW_EXPENSE_ACTION';
export const LOAD_CURRENT_HOUSE_OWED_EXPENSES_ACTION = 'LOAD_CURRENT_HOUSE_OWED_EXPENSES_ACTION';
export const CURRENT_HOUSE_OWED_EXPENSES_LOADED_ACTION = 'CURRENT_HOUSE_OWED_EXPENSES_LOADED_ACTION';
export const LOAD_CURRENT_HOUSE_OUTSTANDING_EXPENSES_ACTION = 'LOAD_CURRENT_HOUSE_OUTSTANDING_EXPENSES_ACTION';
export const CURRENT_HOUSE_OUTSTANDING_EXPENSES_LOADED_ACTION = 'CURRENT_HOUSE_OUTSTANDING_EXPENSES_LOADED_ACTION';

export class LoadOutstandingExpensesAction implements Action {
	type = LOAD_OUTSTANDING_EXPENSES_ACTION;
	// payload is user uid
	constructor(public payload?: string) { }
}

export class OutstandingExpensesLoadedAction implements Action {
	type = OUTSTANDING_EXPENSES_LOADED_ACTION;
	// payload is list of expenses
	constructor(public payload?: any) { }
}

export class LoadOwedExpensesAction implements Action {
	type = LOAD_OWED_EXPENSES_ACTION;
	// payload is user uid
	constructor(public payload?: string) { }
}

export class OwedExpensesLoadedAction implements Action {
	type = OWED_EXPENSES_LOADED_ACTION;
	constructor(public payload?: any) { }
}

export class LoadPastOutstandingExpensesAction implements Action {
	type = LOAD_PAST_OUTSTANDING_EXPENSES_ACTION;
	// payload is user uid
	constructor(public payload?: string) { }
}

export class PastOutstandingExpensesLoadedAction implements Action {
	type = PAST_OUTSTANDING_EXPENSES_LOADED_ACTION;
	// payload is expense[]
	constructor(public payload?: any) { }
}

export class LoadPastOwedExpensesAction implements Action {
	type = LOAD_PAST_OWED_EXPENSES_ACTION;
	// payload is user uid
	constructor(public payload?: string) { }
}

export class PastOwedExpensesLoadedAction implements Action {
	type = PAST_OWED_EXPENSES_LOADED_ACTION;
	// payload is expense[]
	constructor(public payload?: any) { }
}

export class LoadSingleExpenseAction implements Action {
	type = LOAD_SINGLE_EXPENSE_ACTION;
	// payload is expense key
	constructor(public payload?: string) { }
}

export class SingleExpenseLoadedAction implements Action {
	type = SINGLE_EXPENSE_LOADED_ACTION;
	constructor(public payload?: any) { }
}

export interface CreateExpensePayload {
	userKey: string;
	payers: BasicUser[];
	title: string;
	reason: string;
	amount: number;
	individualAmount: number;
	houseKey: string;
	payeeName: string;
}
export class CreateNewExpenseAction implements Action {
	type = CREATE_NEW_EXPENSE_ACTION;
	constructor(public payload?: CreateExpensePayload) { }
}

export interface LoadCurrentHouseExpensePayload {
	userKey: string;
	houseKey: string;
}
export class LoadCurrentHouseOwedExpensesAction implements Action {
	type = LOAD_CURRENT_HOUSE_OWED_EXPENSES_ACTION;
	// Payload is user key
	constructor(public payload?: LoadCurrentHouseExpensePayload) { }
}

export class CurrentHouseOwedExpensesLoadedAction implements Action {
	type = CURRENT_HOUSE_OWED_EXPENSES_LOADED_ACTION;
	constructor(public payload?: any) { }
}

export class LoadCurrentHouseOutstandingExpensesAction implements Action {
	type = LOAD_CURRENT_HOUSE_OUTSTANDING_EXPENSES_ACTION;
	// Payload is user key
	constructor(public payload?: LoadCurrentHouseExpensePayload) { }
}

export class CurrentHouseOutstandingExpensesLoadedAction implements Action {
	type = CURRENT_HOUSE_OUTSTANDING_EXPENSES_LOADED_ACTION;
	constructor(public payload?: any) { }
}
