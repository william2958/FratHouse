import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {TransactionService} from "../../services/transaction.service";
import {ApplicationState} from "../application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {ERROR_TOAST, ShowToastAction} from "../actions/globalActions";
import {
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
}
