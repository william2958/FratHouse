import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../shared/models/transaction";
import {User} from "../../shared/models/user";
import {LoadNextTransactionsAction} from "../../store/actions/transactionActions";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../store/application-state";
import * as _ from 'lodash';
import {Router} from "@angular/router";

@Component({
	selector: 'transaction-list',
	templateUrl: './transaction-list.component.html',
	styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

	@Input() transactions: Transaction[];
	@Input() user: User;
	@Input() insideExpense = false;

	constructor(
		private store: Store<ApplicationState>,
	    private router: Router
	) { }

	ngOnInit() {
	}

	showMoreTransactions() {
		if (this.transactions && this.user) {
			this.store.dispatch(new LoadNextTransactionsAction({
				userKey: this.user.uid,
				// The current transaction key needs to be the OLDEST
				// transaction we have, which atm is the first one but needs
				// to be the last one
				currentTransactionKey: _.last(this.transactions).key
			}));
		}
	}

	seeRelatedExpense(expenseKey: string) {
		this.router.navigate(['/', 'home', 'expenses', expenseKey]);
	}

	seeRelatedHouse(houseKey: string) {
		this.router.navigate(['/', 'home', 'house-detail', houseKey]);
	}

}
