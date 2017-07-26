import { Component, OnInit } from '@angular/core';
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

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

	user$: Observable<any>;
	user: User;
	userSubscription$: Subscription;

	transactions$: Observable<Transaction[]>;
	transactions: Transaction[];

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {

		this.user$ = this.store.select(userSelector);
		this.transactions$ = this.store.select(transactionsSelector);

		this.userSubscription$ = this.user$.subscribe(user => {
			if (user) {
				this.user = user;
				// Get the expenses that other people owe you
				this.store.dispatch(new LoadInitialTransactionsAction(user.uid));
			}
		});

		this.transactions$.subscribe(transactions => {
			this.transactions = transactions;
		});

	}

	showMoreTransactions() {
		if (this.transactions.length > 0) {
			this.store.dispatch(new LoadNextTransactionsAction({
				userKey: this.user.uid,
				// The current transaction key needs to be the OLDEST
				// transaction we have, which atm is the first one but needs
				// to be the last one
				currentTransactionKey: _.last(this.transactions).key
			}));
		}
	}

}
