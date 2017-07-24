import {Action} from "@ngrx/store";
import {ExpenseData} from "../expense-data";
import {
	OUTSTANDING_EXPENSES_LOADED_ACTION, OutstandingExpensesLoadedAction,
	OWED_EXPENSES_LOADED_ACTION, OwedExpensesLoadedAction
} from "../actions/expenseActions";
import * as _ from 'lodash';

export function expenseData(state: ExpenseData, action: Action): ExpenseData {

	switch (action.type) {

		case OUTSTANDING_EXPENSES_LOADED_ACTION:
			return handleOutstandingExpensesLoadedAction(state, action);

		case OWED_EXPENSES_LOADED_ACTION:
			return handleOwedExpensesLoadedAction(state, action);

		default:
			return state;

	}

}

function handleOutstandingExpensesLoadedAction(state: ExpenseData, action: OutstandingExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.outstandingExpenses = [];
	console.log('writing new outstanding expenses to the store: ', action.payload);
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.outstandingExpenses.push(expense);
		}
	}
	return newExpenseData;
}

function handleOwedExpensesLoadedAction(state: ExpenseData, action: OwedExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.owedExpenses = [];
	console.log('writing new owed expenses to the store: ', action.payload);
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.owedExpenses.push(expense);
		}
	}
	return newExpenseData;
}
