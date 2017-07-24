import { Component, OnInit } from '@angular/core';
import {userSelector} from "../../store/selectors/user-selector";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {ExpenseService} from "../../services/expense.service";
import * as _ from 'lodash';
import {Expense} from "../../shared/models/expense";
import {LoadOutstandingExpensesAction, LoadOwedExpensesAction} from "../../store/actions/expenseActions";
import {outstandingExpensesSelector, owedExpensesSelector} from "../../store/selectors/expense-selectors";

@Component({
	selector: 'app-expenses',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	outstandingExpenses$: Observable<Expense[]>;
	owedExpenses$: Observable<Expense[]>;

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {

		this.user$ = this.store.select(userSelector);
		this.outstandingExpenses$ = this.store.select(outstandingExpensesSelector);
		this.owedExpenses$ = this.store.select(owedExpensesSelector);

		this.userSubscription$ = this.user$.subscribe(user => {
			if (user) {
				this.user = _.cloneDeep(user);
				// Get the expenses that other people owe you
				this.store.dispatch(new LoadOutstandingExpensesAction(this.user.uid));
				this.store.dispatch(new LoadOwedExpensesAction(this.user.uid));
			}
		});

		this.owedExpenses$.subscribe(expenses => console.log('expenses: ', expenses));

	}

}
