import {ApplicationState} from "../application-state";
import {House} from "../../shared/models/house";
import {Expense} from "../../shared/models/expense";

export function housesSelector(state: ApplicationState): House[] {

	return state.houseData.houses;

}

export function currentHouseOwedExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.currentHouseOwedExpenses;

}

export function currentHouseOutstandingExpensesSelector(state: ApplicationState): Expense[] {

	return state.expenseData.currentHouseOutstandingExpenses;

}
