export interface Expense {
	key: string;
	date_created: number;
	amount: number;
	payee: string;
	payeeName: string;
	payers: string[];
	reason: string;
	house: string;
	transactions: string[];
}
