export interface Transaction {
	key: string;
	date_created: number;
	payee: string;
	payer: string;
	payeeName: string;
	payerName: string;
	amount: number;
	reason: string;
	expense: string;
	house: string;
}

export interface CreateTransactionModel {
	payee: string;
	amount: number;
	reason: string;
	payeeName: string;
	payerName: string;
}
