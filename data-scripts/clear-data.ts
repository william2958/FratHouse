import {database, initializeApp} from 'firebase';
import {firebaseConfig} from "../src/environments/firebase.config";

initializeApp(firebaseConfig);

const expensesRef = database().ref('expenses');
const housesRef = database().ref('houses');
const housesPerUserRef = database().ref('housesPerUser');
const outstandingExpensesPerUserRef = database().ref('outstandingExpensesPerUser');
const owedExpensesPerUserRef = database().ref('owedExpensesPerUser');
const pastOutstandingExpensesPerUserRef = database().ref('pastOutstandingExpensesPerUser');
const pastOwedExpensesPerUserRef = database().ref('pastOwedExpensesPerUser');
const transactionsRef = database().ref('transactions');
const transactionsPerUserRef = database().ref('transactionsPerUser');


expensesRef.remove();
housesRef.remove();
housesPerUserRef.remove();
outstandingExpensesPerUserRef.remove();
owedExpensesPerUserRef.remove();
pastOutstandingExpensesPerUserRef.remove();
pastOwedExpensesPerUserRef.remove();
transactionsRef.remove();
transactionsPerUserRef.remove();
