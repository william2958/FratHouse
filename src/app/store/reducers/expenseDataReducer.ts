import {Action} from "@ngrx/store";
import {ExpenseData} from "../expense-data";
import {
	CURRENT_HOUSE_OUTSTANDING_EXPENSES_LOADED_ACTION,
	CURRENT_HOUSE_OWED_EXPENSES_LOADED_ACTION, CurrentHouseOutstandingExpensesLoadedAction,
	CurrentHouseOwedExpensesLoadedAction,
	OUTSTANDING_EXPENSES_LOADED_ACTION, OutstandingExpensesLoadedAction,
	OWED_EXPENSES_LOADED_ACTION, OwedExpensesLoadedAction, PAST_OUTSTANDING_EXPENSES_LOADED_ACTION,
	PAST_OWED_EXPENSES_LOADED_ACTION, PastOutstandingExpensesLoadedAction, PastOwedExpensesLoadedAction,
	SINGLE_EXPENSE_LOADED_ACTION, SingleExpenseLoadedAction
} from "../actions/expenseActions";
import * as _ from 'lodash';
import {CREATE_TRANSACTION_ACTION, CreateTransactionAction} from "../actions/transactionActions";

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

		case CURRENT_HOUSE_OWED_EXPENSES_LOADED_ACTION:
			return handleCurrentHouseOwedExpensesLoadedAction(state, action);

		case CURRENT_HOUSE_OUTSTANDING_EXPENSES_LOADED_ACTION:
			return handleCurrentHouseOutstandingExpensesLoadedAction(state, action);

		case SINGLE_EXPENSE_LOADED_ACTION:
			return handleSingleExpenseLoadedAction(state, action);

		case CREATE_TRANSACTION_ACTION:
			return handleCreateTransactionAction(state, action);

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

function handleCurrentHouseOwedExpensesLoadedAction(state: ExpenseData, action: CurrentHouseOwedExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.currentHouseOwedExpenses = [];
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.currentHouseOwedExpenses.push(_.cloneDeep(expense));
		}
	}
	return newExpenseData;
}

function handleCurrentHouseOutstandingExpensesLoadedAction(state: ExpenseData, action: CurrentHouseOutstandingExpensesLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	newExpenseData.currentHouseOutstandingExpenses = [];
	for (const expense of action.payload) {
		if (!(expense.$value === null)) {
			// Set the key value to the $key that's returned by firebase
			expense.key = expense.$key;
			newExpenseData.currentHouseOutstandingExpenses.push(_.cloneDeep(expense));
		}
	}
	return newExpenseData;
}

function handleSingleExpenseLoadedAction(state: ExpenseData, action: SingleExpenseLoadedAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	const expense = _.cloneDeep(action.payload);
	if (!expense.key) {
		expense.key = action.payload.$key;
	}
	newExpenseData.currentExpense = expense;
	return newExpenseData;
}

function handleCreateTransactionAction(state: ExpenseData, action: CreateTransactionAction): ExpenseData {
	const newExpenseData = _.cloneDeep(state);
	console.log('before transaction owed expenses: ', _.cloneDeep(newExpenseData.owedExpenses));
	_.remove(newExpenseData.owedExpenses, expense => {
		console.log('checking remove: ', expense, expense.key === action.payload.expenseKey);
		return expense.key === action.payload.expenseKey;
	});
	console.log('after transaction owed expenses', newExpenseData.owedExpenses);
	return newExpenseData;
}
