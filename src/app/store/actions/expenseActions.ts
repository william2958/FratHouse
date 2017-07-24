import {Action} from "@ngrx/store";
import {BasicUser} from "app/shared/models/user";
export const LOAD_OUTSTANDING_EXPENSES_ACTION = 'LOAD_OUTSTANDING_EXPENSES_ACTION';
export const OUTSTANDING_EXPENSES_LOADED_ACTION = 'OUTSTANDING_EXPENSES_LOADED_ACTION';
export const LOAD_OWED_EXPENSES_ACTION = 'LOAD_OWED_EXPENSES_ACTION';
export const OWED_EXPENSES_LOADED_ACTION = 'OWED_EXPENSES_LOADED_ACTION';
export const CREATE_NEW_EXPENSE_ACTION = 'CREATE_NEW_EXPENSE_ACTION';

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
	constructor(public payload?: string) { }
}

export class OwedExpensesLoadedAction implements Action {
	type = OWED_EXPENSES_LOADED_ACTION;
	constructor(public payload?: any) { }
}

export class CreateExpensePayload {
	userKey: string;
	payers: BasicUser[];
	reason: string;
	amount: number;
}
export class CreateNewExpenseAction implements Action {
	type = CREATE_NEW_EXPENSE_ACTION;
	constructor(public payload?: CreateExpensePayload) { }
}
