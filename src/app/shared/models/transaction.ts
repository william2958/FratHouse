export interface Transaction {
	key: string;
	date_created: number;
	payee: string;
	payer: string;
	amount: number;
	reason: string;
}
