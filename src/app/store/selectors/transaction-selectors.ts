import {ApplicationState} from "../application-state";
import {Transaction} from "../../shared/models/transaction";

export function transactionsSelector(state: ApplicationState): Transaction[] {
	return state.transactionData.transactions;
}
