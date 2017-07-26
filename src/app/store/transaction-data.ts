import {Transaction} from "../shared/models/transaction";

export interface TransactionData {

	transactions: Transaction[];

}

export const INITIAL_TRANSACTION_DATA: TransactionData = {

	transactions: []

};
