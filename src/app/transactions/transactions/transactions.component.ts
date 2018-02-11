import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {userSelector} from "../../store/selectors/user-selector";
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {LoadInitialTransactionsAction, LoadNextTransactionsAction} from "../../store/actions/transactionActions";
import {Transaction} from "../../shared/models/transaction";
import {transactionsSelector} from "../../store/selectors/transaction-selectors";
import {User} from "../../shared/models/user";
import * as _ from 'lodash';
import {Router} from "@angular/router";

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

	user$: Observable<any>;
	userSubscription$: Subscription;

	transactions$: Observable<Transaction[]>;

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {

		this.user$ = this.store.select(userSelector);
		this.transactions$ = this.store.select(transactionsSelector);

		this.userSubscription$ = this.user$.subscribe(user => {
			if (user) {
				// Get the expenses that other people owe you
				this.store.dispatch(new LoadInitialTransactionsAction(user.uid));
			}
		});

	}

	ngOnDestroy() {
		this.userSubscription$.unsubscribe();
	}

}
