import {ApplicationState} from "../application-state";
import {Expense} from "../../shared/models/expense";

export function outstandingExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.outstandingExpenses;

}

export function owedExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.owedExpenses;

}
