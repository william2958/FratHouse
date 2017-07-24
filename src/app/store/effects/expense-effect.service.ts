import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {
	CREATE_EXPENSE_ERROR, ERROR_TOAST, ErrorOccurredAction, ShowToastAction,
	SUCCESS_TOAST
} from "../actions/globalActions";
import {ApplicationState} from "../application-state";
import {Store} from "@ngrx/store";
import {ExpenseService} from "../../services/expense.service";
import {
	CREATE_NEW_EXPENSE_ACTION, LOAD_OUTSTANDING_EXPENSES_ACTION, LOAD_OWED_EXPENSES_ACTION,
	OutstandingExpensesLoadedAction, OwedExpensesLoadedAction
} from "../actions/expenseActions";

@Injectable()
export class ExpenseEffectService {

	constructor (
		private actions$: Actions,
		private expenseService: ExpenseService,
		private store: Store<ApplicationState>
	) { }

	@Effect() getOutstandingExpenses$ = this.actions$
		.ofType(LOAD_OUTSTANDING_EXPENSES_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.expenseService.getOutstandingExpenses(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(expenses => new OutstandingExpensesLoadedAction(expenses));

	@Effect() getOwedExpenses$ = this.actions$
		.ofType(LOAD_OWED_EXPENSES_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.expenseService.getOwedExpenses(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(expenses => new OwedExpensesLoadedAction(expenses));

	@Effect() createNewExpense$ = this.actions$
		.ofType(CREATE_NEW_EXPENSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.expenseService.createExpense({
					amount: action.payload.amount,
					payers: action.payload.payers,
					reason: action.payload.reason
				}, action.payload.userKey)
			).catch(
				(err) => {
					this.store.dispatch(new ErrorOccurredAction({
						type: CREATE_EXPENSE_ERROR,
						message: err.message
					}));
					return Observable.empty();
				}
			)
		)
		.map(response => new ShowToastAction([SUCCESS_TOAST, 'Expense Created!']));

}
