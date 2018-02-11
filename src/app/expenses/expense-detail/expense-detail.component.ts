import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {LoadSingleExpenseAction} from "../../store/actions/expenseActions";
import {ActivatedRoute, Router} from "@angular/router";
import {Expense} from "../../shared/models/expense";
import {User} from "../../shared/models/user";
import * as _ from 'lodash';
import {CreateTransactionAction, LoadCurrentExpenseTransactionsAction} from "../../store/actions/transactionActions";
import {Transaction} from "../../shared/models/transaction";
import {Observable} from "rxjs/Observable";
import {currentExpenseTransactionsSelector} from "../../store/selectors/transaction-selectors";
import {House} from "../../shared/models/house";
import {ERROR_TOAST, ShowToastAction} from "../../store/actions/globalActions";

@Component({
	selector: 'expense-detail',
	templateUrl: './expense-detail.component.html',
	styleUrls: ['./expense-detail.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseDetailComponent implements OnInit, OnChanges {

	@Input() expense: Expense;
	@Input() user: User;
	@Input() houses: House[];

	payers: any[];

	currentExpenseTransactions$: Observable<Transaction[]>;

	expenseId: string;
	houseName = '';

	constructor(
		private store: Store<ApplicationState>,
	    private route: ActivatedRoute,
	    private router: Router
	) { }

	ngOnInit() {

		// this.route.params.subscribe(params => {
		// 	this.expenseId = params['expenseId'];
		// 	this.store.dispatch(new LoadSingleExpenseAction(this.expenseId));
		// });

		// TODO: expense does not load if url is missing expense Id

		this.expenseId = this.route.snapshot.params['expenseId'];
		// If there's an existing expense Id go load it.
		if (this.expenseId) {
			this.store.dispatch(new LoadSingleExpenseAction(this.expenseId));
		}

		this.currentExpenseTransactions$ = this.store.select(currentExpenseTransactionsSelector);

	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['expense']) {
			if (changes['expense'].currentValue) {
				this.payers = _.values(changes['expense'].currentValue.payers);
			}
		}
		if (changes['houses']) {
			if (changes['houses'].currentValue && this.expense) {
				const houseKey = this.expense.house;
				this.houseName = changes['houses'].currentValue.filter(function (el) {
					return el.key === houseKey;
				})[0].name;
			}
		}
	}

	payExpense(reason: string) {
		if (reason) {
			if (this.user && this.expense) {
				console.log('paying expense: ', this.expense);
				this.store.dispatch(new CreateTransactionAction({
					amount: this.expense.individualAmount,
					payee: this.expense.payee,
					reason: reason,
					payerName: this.user.first_name + ' ' + this.user.last_name,
					payeeName: this.expense.payeeName,
					userKey: this.user.uid,
					expenseKey: this.expense.key,
					houseKey: this.expense.house
				}));
			}
		} else {
			this.store.dispatch(new ShowToastAction([ERROR_TOAST, 'Must enter a payment type!']));
		}
	}

	getTransactions() {
		if (this.expense.transactions) {
			console.log('getting transactions...', _.keys(this.expense.transactions));
			this.store.dispatch(new LoadCurrentExpenseTransactionsAction(_.keys(this.expense.transactions)));
		}
	}

	alreadyPaid(expense: Expense) {
		for (const payer in expense.payers) {
			if (this.user.uid === payer) {
				if ((<any>expense.payers[payer]).paid) {
					return true;
				}
			}
		}
		return false;
	}


}
