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
	LOAD_PAST_OUTSTANDING_EXPENSES_ACTION, LOAD_SINGLE_EXPENSE_ACTION,
	OutstandingExpensesLoadedAction, OwedExpensesLoadedAction, PastOutstandingExpensesLoadedAction,
	PastOwedExpensesLoadedAction,
	SingleExpenseLoadedAction
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
					console.error(err);
					return Observable.empty();
				}
			)
		)
		.map(expenses => new OutstandingExpensesLoadedAction(expenses));

	@Effect() getSingleExpense$ = this.actions$
		.ofType(LOAD_SINGLE_EXPENSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is expense key
				this.expenseService.getSingleExpense(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					console.error(err);
					return Observable.empty();
				}
			)
		)
		.map(expense => new SingleExpenseLoadedAction(expense));

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

	@Effect() getPastOutstandingExpenses$ = this.actions$
		.ofType(LOAD_PAST_OUTSTANDING_EXPENSES_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.expenseService.getPastOutstandingExpenses(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(expenses => new PastOutstandingExpensesLoadedAction(expenses));

	@Effect() getPastOwedExpenses$ = this.actions$
		.ofType(LOAD_PAST_OUTSTANDING_EXPENSES_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.expenseService.getPastOwedExpenses(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(expenses => new PastOwedExpensesLoadedAction(expenses));

	@Effect() createNewExpense$ = this.actions$
		.ofType(CREATE_NEW_EXPENSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.expenseService.createExpense({
					amount: action.payload.amount,
					payers: action.payload.payers,
					reason: action.payload.reason,
					payeeName: action.payload.payeeName
				}, action.payload.userKey, action.payload.houseKey)
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
