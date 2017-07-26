import {Expense} from "../shared/models/expense";

export interface ExpenseData {

	outstandingExpenses: Expense[];
	owedExpenses: Expense[];
	pastOutstandingExpenses: Expense[];
	pastOwedExpenses: Expense[];
	currentExpense: Expense;

}

export const INITIAL_EXPENSE_DATA: ExpenseData = {

	outstandingExpenses: [],
	owedExpenses: [],
	pastOutstandingExpenses: [],
	pastOwedExpenses: [],
	currentExpense: undefined

};
