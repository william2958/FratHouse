import {Expense} from "../shared/models/expense";
import {Transaction} from "../shared/models/transaction";

export interface ExpenseData {

	outstandingExpenses: Expense[];
	owedExpenses: Expense[];
	pastOutstandingExpenses: Expense[];
	pastOwedExpenses: Expense[];
	currentExpense: Expense;
	currentHouseOwedExpenses: Expense[];
	currentHouseOutstandingExpenses: Expense[];

}

export const INITIAL_EXPENSE_DATA: ExpenseData = {

	outstandingExpenses: [],
	owedExpenses: [],
	pastOutstandingExpenses: [],
	pastOwedExpenses: [],
	currentExpense: undefined,
	currentHouseOwedExpenses: [],
	currentHouseOutstandingExpenses: []

};
