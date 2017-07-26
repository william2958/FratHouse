import {Action} from "@ngrx/store";
import {ExpenseData} from "../expense-data";
import {
	OUTSTANDING_EXPENSES_LOADED_ACTION, OutstandingExpensesLoadedAction,
	OWED_EXPENSES_LOADED_ACTION, OwedExpensesLoadedAction, PAST_OUTSTANDING_EXPENSES_LOADED_ACTION,
	PAST_OWED_EXPENSES_LOADED_ACTION, PastOutstandingExpensesLoadedAction, PastOwedExpensesLoadedAction,
	SINGLE_EXPENSE_LOADED_ACTION, SingleExpenseLoadedAction
} from "../actions/expenseActions";
import * as _ from 'lodash';

export function expenseData(state: ExpenseData, action: Action): ExpenseData {

	switch (action.type) {

		case OUTSTANDING_EXPENSES_LOADED_ACTION:
			return handleOutstandingExpensesLoadedAction(state, action);

		case OWED_EXPENSES_LOADED_ACTION:
			return handleOwedExpensesLoadedAction(state, action);

		case PAST_OUTSTANDING_EXPENSES_LOADED_ACTION:
			return handlePastOutstandingExpensesLoadedAction(state, action);

		case PAST_OWED_EXPENSES_LOADED_ACTION:
			return handlePastOwedExpensesLoadedAction(state, action);

		case SINGLE_EXPENSE_LOADED_ACTION:
			return handleSingleExpenseLoadedAction(state, action);

		default:
			return state;

	}

}

function handleOutstandingExpensesLoadedAction(state: ExpenseData, action: OutstandingExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.outstandingExpenses = [];
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.outstandingExpenses.push(_.cloneDeep(expense));
		}
	}
	return newExpenseData;
}

function handleOwedExpensesLoadedAction(state: ExpenseData, action: OwedExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.owedExpenses = [];
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.owedExpenses.push(_.cloneDeep(expense));
		}
	}
	return newExpenseData;
}

function handlePastOutstandingExpensesLoadedAction(state: ExpenseData, action: PastOutstandingExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.pastOutstandingExpenses = [];
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.pastOutstandingExpenses.push(_.cloneDeep(expense));
		}
	}
	return newExpenseData;
}

function handlePastOwedExpensesLoadedAction(state: ExpenseData, action: PastOwedExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.pastOwedExpenses = [];
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.pastOwedExpenses.push(_.cloneDeep(expense));
		}
	}
	return newExpenseData;
}

function handleSingleExpenseLoadedAction(state: ExpenseData, action: SingleExpenseLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	const expense = _.cloneDeep(action.payload);
	expense.key = action.payload.$key;
	newExpenseData.currentExpense = expense;
	return newExpenseData;
}
