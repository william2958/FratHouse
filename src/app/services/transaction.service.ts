import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {CreateTransactionModel, Transaction} from "../shared/models/transaction";
import {Subject} from "rxjs/Subject";
import * as firebase from 'firebase';
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";
import {Observable} from "rxjs/Observable";

export const INITIAL_TRANSACTION_PAGE_SIZE = 20;
export const TRANSACTION_PAGE_SIZE = 10;

@Injectable()
export class TransactionService {

	constructor(
		private db: AngularFireDatabase
	) { }

	getInitialTransactions(userKey: string) {
		// Load the first page of accounts

		const firstPageTransactionKeys$ = this.findTransactionKeys(userKey, {
			query: {
				limitToLast: INITIAL_TRANSACTION_PAGE_SIZE
			}
		});

		return this.findTransactionsForTransactionKeys(firstPageTransactionKeys$);

	}

	loadNextPage(userKey: string, currentTransactionKey: string) {

		const nextPageKeys$ = this.findTransactionKeys(userKey, {
			query: {
				orderByKey: true,
				endAt: currentTransactionKey,
				limitToLast: TRANSACTION_PAGE_SIZE + 1
			}
		});

		return this.findTransactionsForTransactionKeys(nextPageKeys$)
			.map(transactions => transactions.slice(0, transactions.length - 1));

	}

	createTransaction(transactionData: CreateTransactionModel, userKey: string, expenseKey: string, houseKey: string) {
		const newTransactionKey = this.db.database.ref().child('transactions').push().key;
		const dataToSave = {};

		dataToSave['transactions/' + newTransactionKey] = {
			amount: transactionData.amount,
			payee: transactionData.payee,
			payer: userKey,
			payerName: transactionData.payerName,
			payeeName: transactionData.payeeName,
			reason: transactionData.reason,
			expense: expenseKey,
			house: houseKey,
			date_created: firebase.database.ServerValue.TIMESTAMP
		};

		dataToSave['transactionsPerUser/' + userKey + '/' + newTransactionKey] = transactionData.amount;

		return this.firebaseUpdate(dataToSave);

	}

	findTransactionKeys(userKey: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
		return this.db.list('transactionsPerUser/' + userKey, query)
			.map(transactionPerUser => {
				return transactionPerUser.map(transaction => transaction.$key);
			});
	}

	findTransactionsForTransactionKeys(transactionKeys$: Observable<string[]>): Observable<Transaction[]> {
		return transactionKeys$
			.map(transactions => {
				return transactions.map(transactionKey => {
					return this.db.object('transactions/' + transactionKey);
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
