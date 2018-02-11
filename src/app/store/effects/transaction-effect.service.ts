import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {TransactionService} from "../../services/transaction.service";
import {ApplicationState} from "../application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {ERROR_TOAST, ShowToastAction, SUCCESS_TOAST} from "../actions/globalActions";
import {
	CREATE_TRANSACTION_ACTION,
	CurrentExpenseTransactionsLoadedAction,
	LOAD_CURRENT_EXPENSE_TRANSACTIONS_ACTION,
	LOAD_INITIAL_TRANSACTIONS_ACTION, LOAD_NEXT_TRANSACTIONS_ACTION,
	TransactionsLoadedAction
} from "../actions/transactionActions";

@Injectable()
export class TransactionEffectService {

	constructor (
		private actions$: Actions,
	    private transactionService: TransactionService,
	    private store: Store<ApplicationState>
	) { }

	@Effect() getTransactions$ = this.actions$
		.ofType(LOAD_INITIAL_TRANSACTIONS_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.transactionService.getInitialTransactions(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(transactions => new TransactionsLoadedAction(transactions));

	@Effect() getNextTransactions$ = this.actions$
		.ofType(LOAD_NEXT_TRANSACTIONS_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.transactionService.loadNextPage(action.payload.userKey, action.payload.currentTransactionKey)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(transactions => new TransactionsLoadedAction(transactions));

	@Effect() getCurrentExpenseTransactions$ = this.actions$
		.ofType(LOAD_CURRENT_EXPENSE_TRANSACTIONS_ACTION)
		.switchMap(action => Observable
			.from(
				// We need to do Observable Of because findTransactionsForTransactionKeys expects
				// an observable as the parameter but the action.payload is not an observable.
				this.transactionService.findTransactionsForTransactionKeys(Observable.of(action.payload))
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(transactions => new CurrentExpenseTransactionsLoadedAction(transactions));

	@Effect() createTransaction$ = this.actions$
		.ofType(CREATE_TRANSACTION_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.transactionService.createTransaction({
					amount: action.payload.amount,
					payee: action.payload.payee,
					reason: action.payload.reason,
					payerName: action.payload.payerName,
					payeeName: action.payload.payeeName
				}, action.payload.userKey, action.payload.expenseKey, action.payload.houseKey)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(response => new ShowToastAction([SUCCESS_TOAST, 'Processing Transaction. Please wait a few minutes.']));
}
