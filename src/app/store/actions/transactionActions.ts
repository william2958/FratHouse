import {Action} from "@ngrx/store";

export const LOAD_INITIAL_TRANSACTIONS_ACTION = 'LOAD_INITIAL_TRANSACTIONS_ACTION';
export const TRANSACTIONS_LOADED_ACTION = 'TRANSACTIONS_LOADED_ACTION';
export const LOAD_NEXT_TRANSACTIONS_ACTION = 'LOAD_NEXT_TRANSACTIONS_ACTION';

export class LoadInitialTransactionsAction implements Action {
	type = LOAD_INITIAL_TRANSACTIONS_ACTION;
	// Payload is user string
	constructor(public payload?: string) { }
}

export class TransactionsLoadedAction implements Action {
	type = TRANSACTIONS_LOADED_ACTION;
	constructor(public payload?: any) { }
}

export interface PaginateTransactionsPayload {
	userKey: string;
	currentTransactionKey: string;
}
export class LoadNextTransactionsAction implements Action {
	type = LOAD_NEXT_TRANSACTIONS_ACTION;
	constructor(public payload?: PaginateTransactionsPayload) { }
}
