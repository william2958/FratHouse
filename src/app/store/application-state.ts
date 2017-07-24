import {RouterState} from "@ngrx/router-store";
import {INITIAL_UI_STATE, UiState} from "./ui-state";
import {HouseData, INITIAL_HOUSE_DATA} from "./house-data";
import {ExpenseData, INITIAL_EXPENSE_DATA} from "./expense-data";
export interface ApplicationState {

	router: RouterState;
	uiState: UiState;
	houseData: HouseData;
	expenseData: ExpenseData;

}

export const INITIAL_APPLICATION_STATE: ApplicationState = {

	uiState: INITIAL_UI_STATE,
	houseData: INITIAL_HOUSE_DATA,
	expenseData: INITIAL_EXPENSE_DATA,
	router: {
		path: ''
	}

};
