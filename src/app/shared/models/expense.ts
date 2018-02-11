export interface Expense {
	key: string;
	title: string;
	date_created: number;
	amount: number;
	individualAmount: number;
	payee: string;
	payeeName: string;
	payers: Payer[];
	reason: string;
	house: string;
	transactions: string[];
}

export interface Payer {
	name: string;
	paid: any;
	username: string;
}
