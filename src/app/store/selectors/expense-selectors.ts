import {ApplicationState} from "../application-state";
import {Expense} from "../../shared/models/expense";

export function outstandingExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.outstandingExpenses;

}

export function owedExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.owedExpenses;

}

export function pastOutstandingExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.pastOutstandingExpenses;

}

export function pastOwedExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.pastOwedExpenses;

}

export function currentExpenseSelector(state: ApplicationState): Expense {

	return state.expenseData.currentExpense;

}
