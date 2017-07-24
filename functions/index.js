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
			toUpdate['/owedExpensesPerUser/' + key + '/' + event.params.expenseId] = original.amount;
		});

		return firebaseUpdate(toUpdate);

	});

function firebaseUpdate(dataToSave) {

	return admin.database().ref().update(dataToSave);

}
