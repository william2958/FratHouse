import {Component, OnDestroy, OnInit} from '@angular/core';
import {userSelector} from "../../store/selectors/user-selector";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {ExpenseService} from "../../services/expense.service";
import * as _ from 'lodash';
import {Expense} from "../../shared/models/expense";
import {
	LoadOutstandingExpensesAction, LoadOwedExpensesAction,
	LoadPastOutstandingExpensesAction, LoadPastOwedExpensesAction, SingleExpenseLoadedAction
} from "../../store/actions/expenseActions";
import {
	currentExpenseSelector,
	outstandingExpensesSelector, owedExpensesSelector,
	pastOutstandingExpensesSelector, pastOwedExpensesSelector
} from "../../store/selectors/expense-selectors";
import {ActivatedRoute, Router} from "@angular/router";
import {House} from "../../shared/models/house";
import {housesSelector} from "../../store/selectors/houses-selector";

@Component({
	selector: 'app-expenses',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	outstandingExpenses$: Observable<Expense[]>;
	owedExpenses$: Observable<Expense[]>;
	expense$: Observable<Expense>;
	houses$: Observable<House[]>;
	// pastOutstandingExpenses$: Observable<Expense[]>;
	// pastOwedExpenses$: Observable<Expense[]>;

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {

		this.user$ = this.store.select(userSelector);
		this.outstandingExpenses$ = this.store.select(outstandingExpensesSelector);
		this.owedExpenses$ = this.store.select(owedExpensesSelector);
		this.expense$ = this.store.select(currentExpenseSelector);
		this.houses$ = this.store.select(housesSelector);
		// this.pastOutstandingExpenses$ = this.store.select(pastOutstandingExpensesSelector);
		// this.pastOwedExpenses$ = this.store.select(pastOwedExpensesSelector);

		this.userSubscription$ = this.user$.subscribe(user => {
			if (user) {
				this.user = _.cloneDeep(user);
				// Get the expenses that other people owe you
				this.store.dispatch(new LoadOutstandingExpensesAction(this.user.uid));
				this.store.dispatch(new LoadOwedExpensesAction(this.user.uid));
			}
		});

	}

	showOlderExpenses() {
		if (this.user) {
			this.store.dispatch(new LoadPastOutstandingExpensesAction(this.user.uid));
			this.store.dispatch(new LoadPastOwedExpensesAction(this.user.uid));
		}
	}

	ngOnDestroy() {
		this.userSubscription$.unsubscribe();
	}

}
