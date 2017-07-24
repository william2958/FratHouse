import {Expense} from "../shared/models/expense";

export interface ExpenseData {

	outstandingExpenses: Expense[];
	owedExpenses: Expense[];

}

export const INITIAL_EXPENSE_DATA: ExpenseData = {

	outstandingExpenses: [],
	owedExpenses: []

};
