const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.addExpenseToUsersOwedExpenses = functions.database.ref('/expenses/{expenseId}')
	.onWrite(event => {
		if (event.data.previous.exists()) {
			return;
		}
		// Exit when the data is deleted.
		if (!event.data.exists()) {
			return;
		}

		// Grab the current value of what was written to the database
		const original = event.data.val();
		const toUpdate = {};

		Object.keys(original.payers).forEach(function(key) {
			// The push id can be found by looking at the ref defined in the function definition
			console.log('expense object: ', original);
			toUpdate['/owedExpensesPerUser/' + key + '/' + original.house + '/' + event.params.expenseId] = original.amount;
		});

		return firebaseUpdate(toUpdate);

	});

exports.processTransaction = functions.database.ref('/transactions/{transactionId}')
	.onWrite(event => {
		// Only process for new data
		if (event.data.previous.exists()) {
			return;
		}
		// Exit when the data is deleted.
		if (!event.data.exists()) {
			return;
		}

		// Grab the current value of what was written to the database
		const original = event.data.val();
		const toUpdate = {};

		toUpdate['/transactionsPerUser/' + original.payee + '/' + event.params.transactionId] = original.amount;
		toUpdate['/expenses/' + original.expense + '/payers/' + original.payer + '/paid'] = admin.database.ServerValue.TIMESTAMP;
		toUpdate['/expenses/' + original.expense + '/transactions/' + event.params.transactionId] = true;

		let db = admin.database();
		let payersRef = db.ref('expenses/' + original.expense + '/payers');
		payersRef.once('value', function(data) {

			if (data.exists()) {

				const payers = data.val();

				// If this person has already paid
				if (payers[original.payer].paid) {
					// If a person tries to pay for an expense twice
					console.error('Attempting to pay for already paid expense.');
					// We would then need to delete the transaction
					const clearTransactionUpdate = {};
					clearTransactionUpdate['transactions/' + event.params.transactionId] = null;
					clearTransactionUpdate['transactionsPerUser/' + original.payer + '/' + event.params.transactionId] = null;

					return firebaseUpdate(clearTransactionUpdate);
				}

				// Need to check if all payers have paid this expense
				let paid = true;
				Object.keys(payers).forEach(function (key) {
					if (key === original.payer) {
						// If the payer is the person paying right now
					} else {
						if (!payers[key].paid) {
							// If even one person paid, then set paid to false
							paid = false
						}
					}
				});
				// If everyone has paid and the payer right now has not
				if (paid && !payers[original.payer].paid) {
					console.log('everyone has paid in this expense.')
					// This is when everyone who is a payer in the expense has paid.
					// In this case we need to move the expense from outstanding to paid
					// On both the payer's and payee's side.

					// Clearing the payee's outstandingExpenses
					toUpdate['/outstandingExpensesPerUser/' + original.payee + '/' + original.house + '/' + original.expense] = null;
					toUpdate['/pastOutstandingExpensesPerUser/' + original.payee + '/' + original.house + '/' + original.expense] = original.amount;

					// Clearing the payer's owedExpenses
					toUpdate['/owedExpensesPerUser/' + original.payer + '/' + original.house + '/' + original.expense] = null;
					toUpdate['/pastOwedExpensesPerUser/' + original.payer + '/' + original.house + '/' + original.expense] = original.amount;

					return firebaseUpdate(toUpdate);

				} else {
					// If all we need to do is pay for the expense
					// Because there are 1+ people who haven't paid yet

					// Clearing the payer's owedExpenses
					toUpdate['/owedExpensesPerUser/' + original.payer + '/' + original.house + '/' + original.expense] = null;
					toUpdate['/pastOwedExpensesPerUser/' + original.payer + '/' + original.house + '/' + original.expense] = original.amount;

					return firebaseUpdate(toUpdate);
				}
			}

		});

	});

function firebaseUpdate(dataToSave) {

	return admin.database().ref().update(dataToSave);

}
