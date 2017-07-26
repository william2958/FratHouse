import {RouterState} from "@ngrx/router-store";
import {INITIAL_UI_STATE, UiState} from "./ui-state";
import {HouseData, INITIAL_HOUSE_DATA} from "./house-data";
import {ExpenseData, INITIAL_EXPENSE_DATA} from "./expense-data";
import {INITIAL_TRANSACTION_DATA, TransactionData} from "./transaction-data";
export interface ApplicationState {

	router: RouterState;
	uiState: UiState;
	houseData: HouseData;
	expenseData: ExpenseData;
	transactionData: TransactionData;

}

export const INITIAL_APPLICATION_STATE: ApplicationState = {

	uiState: INITIAL_UI_STATE,
	houseData: INITIAL_HOUSE_DATA,
	expenseData: INITIAL_EXPENSE_DATA,
	transactionData: INITIAL_TRANSACTION_DATA,
	router: {
		path: ''
	}

};
