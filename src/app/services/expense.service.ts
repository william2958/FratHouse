import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {CreateExpenseModel} from "../shared/models/createExpense";
import * as firebase from 'firebase';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Expense} from "../shared/models/expense";
import * as _ from 'lodash';

@Injectable()
export class ExpenseService {

	constructor(
		private db: AngularFireDatabase
	) { }

	getOutstandingExpenses(userKey: string) {
		const expenseKeys$ = this.findOutstandingExpenseKeys(userKey);

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getOwedExpenses(userKey: string) {
		const expenseKeys$ = this.findOwedExpenseKeys(userKey);

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getPastOutstandingExpenses(userKey: string) {
		const expenseKeys$ = this.findPastOutstandingExpenseKeys(userKey);

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getPastOwedExpenses(userKey: string) {
		const expenseKeys$ = this.findPastOwedExpenseKeys(userKey);

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getCurrentHouseOwedExpenses(userKey: string, houseKey: string) {
		const expenseKeys$ = this.db.list('owedExpensesPerUser/' + userKey + '/' + houseKey)
			.map(expensePerUser => {
				return expensePerUser.map(expenseKey => expenseKey.$key);
			});

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getCurrentHouseOutstandingExpenses(userKey: string, houseKey: string) {
		const expenseKeys$ = this.db.list('outstandingExpensesPerUser/' + userKey + '/' + houseKey)
			.map(expensePerUser => {
				return expensePerUser.map(expenseKey => expenseKey.$key);
			});

		return this.findExpensesForExpenseKeys(expenseKeys$);
	}

	getSingleExpense(expenseKey: string) {
		return this.db.object('expenses/' + expenseKey).first();
	}

	createExpense(expenseData: CreateExpenseModel, userKey: string, houseKey: string) {
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
			individualAmount: expensesToSave.individualAmount,
			payee: userKey,
			payeeName: expensesToSave.payeeName,
			payers: payersOutstanding,
			title: expensesToSave.title,
			reason: expensesToSave.reason,
			date_created: firebase.database.ServerValue.TIMESTAMP,
			house: houseKey
		};

		dataToSave['outstandingExpensesPerUser/' + userKey + '/' + houseKey + '/' + newExpenseKey] = expensesToSave.amount;

		return this.firebaseUpdate(dataToSave);

	}

	findOutstandingExpenseKeys(userKey: string): Observable<string[]> {
		return this.db.list('outstandingExpensesPerUser/' + userKey)
			.map(expensePerUser => {
				// expensePerUser is actually a list of objects of format
				// -HouseId
				//  -ExpenseId : ExpenseAmount
				let keysFound;
				keysFound = expensePerUser.map(expense => {
					// This is where we can actually get the expenseIds
					const keys = [];
					// Loop through all the keys inside the HouseId node
					for (const key in expense) {
						keys.push(key);
					}
					// Keys variable is actually the array of expense keys
					return keys;
				});
				// Because the keys returned out of the previous function results in
				// [[Array(2), Array(1)]] each array representing a house, we have to
				// Flatten that array to make just one array of expense keys
				const keysFound2 = _.union.apply(null, keysFound);
				return keysFound2;
			});
	}

	findOwedExpenseKeys(userKey: string): Observable<string[]> {
		return this.db.list('owedExpensesPerUser/' + userKey)
			.map(expensePerUser => {
				// expensePerUser is actually a list of objects of format
				// -HouseId
				//  -ExpenseId : ExpenseAmount
				let keysFound;
				keysFound = expensePerUser.map(expense => {
					// This is where we can actually get the expenseIds
					const keys = [];
					// Loop through all the keys inside the HouseId node
					for (const key in expense) {
						keys.push(key);
					}
					// Keys variable is actually the array of expense keys
					return keys;
				});
				// Because the keys returned out of the previous function results in
				// [[Array(2), Array(1)]] each array representing a house, we have to
				// Flatten that array to make just one array of expense keys
				const keysFound2 = _.union.apply(null, keysFound);
				return keysFound2;
			});
	}

	findPastOutstandingExpenseKeys(userKey: string): Observable<string[]> {
		return this.db.list('pastOutstandingExpensesPerUser/' + userKey)
			.map(expensePerUser => {
				// expensePerUser is actually a list of objects of format
				// -HouseId
				//  -ExpenseId : ExpenseAmount
				let keysFound;
				keysFound = expensePerUser.map(expense => {
					// This is where we can actually get the expenseIds
					const keys = [];
					// Loop through all the keys inside the HouseId node
					for (const key in expense) {
						keys.push(key);
					}
					// Keys variable is actually the array of expense keys
					return keys;
				});
				// Because the keys returned out of the previous function results in
				// [[Array(2), Array(1)]] each array representing a house, we have to
				// Flatten that array to make just one array of expense keys
				const keysFound2 = _.union.apply(null, keysFound);
				return keysFound2;
			});
	}

	findPastOwedExpenseKeys(userKey: string): Observable<string[]> {
		return this.db.list('pastOwedExpensesPerUser/' + userKey)
			.map(expensePerUser => {
				// expensePerUser is actually a list of objects of format
				// -HouseId
				//  -ExpenseId : ExpenseAmount
				let keysFound;
				keysFound = expensePerUser.map(expense => {
					// This is where we can actually get the expenseIds
					const keys = [];
					// Loop through all the keys inside the HouseId node
					for (const key in expense) {
						keys.push(key);
					}
					// Keys variable is actually the array of expense keys
					return keys;
				});
				// Because the keys returned out of the previous function results in
				// [[Array(2), Array(1)]] each array representing a house, we have to
				// Flatten that array to make just one array of expense keys
				const keysFound2 = _.union.apply(null, keysFound);
				return keysFound2;
			});
	}

	findExpensesForExpenseKeys(expenseKeys$: Observable<string[]>): Observable<Expense[]> {
		return expenseKeys$
			.map(expenses => {
				// For some reason the array that's passed back is in the form
				// [[Array]] so we have to extract the first node of it
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
