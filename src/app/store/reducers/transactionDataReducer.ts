import {TransactionData} from "../transaction-data";
import {Action} from "@ngrx/store";
import {TRANSACTIONS_LOADED_ACTION, TransactionsLoadedAction} from "../actions/transactionActions";
import * as _ from 'lodash';

export function transactionData(state: TransactionData, action: Action): TransactionData {

	switch (action.type) {

		case TRANSACTIONS_LOADED_ACTION:
			return handleTransactionsLoadedAction(state, action);

		default:
			return state;

	}

}

function handleTransactionsLoadedAction(state: TransactionData, action: TransactionsLoadedAction): TransactionData {
	const newTransactionData = _.cloneDeep(state);

	// If this is not the first batch of transactions received.
	if (newTransactionData.transactions.length > 0) {
		if (action.payload.length > 0) {
			// Check if any transactions loaded have already been loaded
			if (!_.some(newTransactionData.transactions, action.payload[0])) {
				for (const transaction of action.payload) {
					if (!(transaction.$value === null)) {
						// Set the key value to the $key that's returned by firebase
						transaction.key = transaction.$key;
						// This feeds the transactions into the array from the front.
						// This allows for the newest transactions to be first
						newTransactionData.transactions.push(transaction);
					}
				}
			} else {
				console.error('Transactions already loaded in store!');
			}
		} else {
			console.log('no more transactions are available!');
		}
	} else {
		// If this is receiving the first batch of transactions.
		for (const transaction of action.payload) {
			if (!(transaction.$value === null)) {
				// Set the key value to the $key that's returned by firebase
				transaction.key = transaction.$key;
				// This feeds the transactions into the array from the front.
				// This allows for the newest transactions to be first
				newTransactionData.transactions.unshift(transaction);
			}
		}
	}



	return newTransactionData;
}
