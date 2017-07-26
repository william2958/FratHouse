import { Component, OnInit } from '@angular/core';
import {userSelector} from "../../store/selectors/user-selector";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import * as _ from 'lodash';
import {LoadSingleExpenseAction} from "../../store/actions/expenseActions";
import {ActivatedRoute} from "@angular/router";
import {Expense} from "../../shared/models/expense";
import {currentExpenseSelector} from "../../store/selectors/expense-selectors";
import {TransactionService} from "../../services/transaction.service";

@Component({
	selector: 'app-expense-detail',
	templateUrl: './expense-detail.component.html',
	styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	expense$: Observable<Expense>;
	expenseId: string;

	constructor(
		private store: Store<ApplicationState>,
	    private route: ActivatedRoute,
	    private transactionService: TransactionService
	) { }

	ngOnInit() {

		this.route.params.subscribe(params => {
			this.expenseId = params['expenseId'];
			this.store.dispatch(new LoadSingleExpenseAction(this.expenseId));
		});

		this.user$ = this.store.select(userSelector);
		this.expense$ = this.store.select(currentExpenseSelector);

		this.userSubscription$ = this.user$.subscribe(user => {
			if (user) {
				this.user = _.cloneDeep(user);
			}
		});

	}

	payExpense(expense: Expense) {
		if (this.user && expense) {
			console.log('paying expense: ', expense);
			this.transactionService.createTransaction({
				amount: expense.amount,
				payee: expense.payee,
				reason: 'Transaction Reason',
				payerName: this.user.first_name + ' ' + this.user.last_name,
				payeeName: expense.payeeName
			}, this.user.uid, expense.key, expense.house);
		}
	}



}
