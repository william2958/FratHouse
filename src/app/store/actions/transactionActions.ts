import {Action} from "@ngrx/store";
import {Transaction} from "../../shared/models/transaction";

export const LOAD_INITIAL_TRANSACTIONS_ACTION = 'LOAD_INITIAL_TRANSACTIONS_ACTION';
export const TRANSACTIONS_LOADED_ACTION = 'TRANSACTIONS_LOADED_ACTION';
export const LOAD_NEXT_TRANSACTIONS_ACTION = 'LOAD_NEXT_TRANSACTIONS_ACTION';
export const LOAD_CURRENT_EXPENSE_TRANSACTIONS_ACTION = 'LOAD_CURRENT_EXPENSE_TRANSACTIONS_ACTION';
export const CURRENT_EXPENSE_TRANSACTIONS_LOADED_ACTION = 'CURRENT_EXPENSE_TRANSACTIONS_LOADED_ACTION';
export const CREATE_TRANSACTION_ACTION = 'CREATE_TRANSACTION_ACTION';

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

export class LoadCurrentExpenseTransactionsAction implements Action {
	type = LOAD_CURRENT_EXPENSE_TRANSACTIONS_ACTION;
	// payload is string array of transaction keys
	constructor(public payload?: string[]) { }
}

export class CurrentExpenseTransactionsLoadedAction implements Action {
	type = CURRENT_EXPENSE_TRANSACTIONS_LOADED_ACTION;
	// payload is array of transaction objects
	constructor(public payload?: any) { }
}

export interface CreateTransactionPayload {
	amount: number;
	payee: string;
	reason: string;
	payerName: string;
	payeeName: string;
	userKey: string;
	expenseKey: string;
	houseKey: string;
}
export class CreateTransactionAction implements Action {
	type = CREATE_TRANSACTION_ACTION;
	constructor(public payload?: CreateTransactionPayload) { }
}
