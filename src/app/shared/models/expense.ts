export interface Expense {
	key: string;
	date_created: number;
	amount: number;
	payee: string;
	payers: string[];
	reason: string;
}
