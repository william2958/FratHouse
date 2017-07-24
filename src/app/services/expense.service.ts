import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {CreateExpenseModel} from "../shared/models/createExpense";
import * as firebase from 'firebase';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Expense} from "../shared/models/expense";

@Injectable()
export class ExpenseService {

	constructor(
		private db: AngularFireDatabase
	) { }

	getOutstandingExpenses(userKey: string) {
		console.log('getting outstanding expenses in service...');
		const expenseKeys$ = this.findOutstandingExpenseKeys(userKey);

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getOwedExpenses(userKey: string) {
		console.log('getting owed expenses in service...');
		const expenseKeys$ = this.findOwedExpenseKeys(userKey);

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	createExpense(expenseData: CreateExpenseModel, userKey: string) {
		// Creates object with last key being userKey: userKeyParam
		const expensesToSave = Object.assign({}, expenseData, {userKey});
		const newExpenseKey = this.db.database.ref().child('expenses').push().key;
		const dataToSave = {};
		const payersOutstanding = {};

		for (const payer of expensesToSave.payers) {
			console.log('creating expense with payer: ', payer);
			payersOutstanding[payer.key] = {
				name: payer.name,
				username: payer.username,
				paid: false
			};
		}

		dataToSave['expenses/' + newExpenseKey] = {
			amount: expensesToSave.amount,
			payee: userKey,
			payers: payersOutstanding,
			reason: expensesToSave.reason,
			date_created: firebase.database.ServerValue.TIMESTAMP
		};

		dataToSave['outstandingExpensesPerUser/' + userKey + '/' + newExpenseKey] = expensesToSave.amount;

		return this.firebaseUpdate(dataToSave);

	}

	findOutstandingExpenseKeys(userKey: string): Observable<string[]> {
		return this.db.list('outstandingExpensesPerUser/' + userKey)
			.map(expensePerUser => {
				return expensePerUser.map(expense => expense.$key);
			});
	}

	findOwedExpenseKeys(userKey: string): Observable<string[]> {
		return this.db.list('owedExpensesPerUser/' + userKey)
			.map(expensePerUser => {
				return expensePerUser.map(expense => expense.$key);
			});
	}

	findExpensesForExpenseKeys(expenseKeys$: Observable<string[]>): Observable<Expense[]> {
		return expenseKeys$
			.map(expenses => {
				return expenses.map(expenseKey => {
					return this.db.object('expenses/' + expenseKey);
				});
			})
			.flatMap(firebaseObjectObservables => Observable.combineLatest(firebaseObjectObservables));
	}

	firebaseUpdate(dataToSave) {

		const subject = new Subject();

		this.db.database.ref().update(dataToSave)
			.then(
				val => {
					subject.next(val);
					subject.complete();
				},
				err => {
					subject.error(err);
					subject.complete();
				}
			);

		return subject.asObservable();

	}

}
