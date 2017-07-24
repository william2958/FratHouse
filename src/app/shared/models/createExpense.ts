import {BasicUser} from "./user";
export interface CreateExpenseModel {
	amount: number;
	payers: BasicUser[];
	reason: string;
}
