import {BasicUser} from "./user";
export interface CreateExpenseModel {
	amount: number;
	individualAmount: number;
	payers: BasicUser[];
	title: string;
	reason: string;
	payeeName: string;
}
