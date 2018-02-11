import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Expense} from "../../shared/models/expense";
import {User} from "../../shared/models/user";

@Component({
	selector: 'house-expenses',
	templateUrl: './house-expenses.component.html',
	styleUrls: ['./house-expenses.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseExpensesComponent implements OnInit, OnChanges {

	@Input() owedExpenses: Expense[];
	@Input() outstandingExpenses: Expense[];
	@Input() user: User;

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['outstandingExpenses']) {
			if (changes['outstandingExpenses'].currentValue) {
				console.log('outstanding expenses: ', changes['outstandingExpenses'].currentValue);
			}
		}
	}

	// Method to count how many payers have not paid in an expense
	remainingPayers(expense: Expense) {
		let remaining = 0;
		for (const payerKey in expense.payers) {
			if (!(<any>expense.payers[payerKey]).paid) {
				remaining += 1;
			}
		}
		return remaining;
	}

}
