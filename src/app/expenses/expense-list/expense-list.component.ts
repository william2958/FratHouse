import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Expense} from "../../shared/models/expense";
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {SingleExpenseLoadedAction} from "../../store/actions/expenseActions";
import {Router} from "@angular/router";

@Component({
	selector: 'expense-list',
	templateUrl: './expense-list.component.html',
	styleUrls: ['./expense-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseListComponent implements OnInit {

	@Input() owedExpenses;
	@Input() outstandingExpenses: Expense[];
	list = 'owed';

	constructor(
	    private store: Store<ApplicationState>,
	    private router: Router
	) { }

	ngOnInit() {
	}

	goToExpense(expense: Expense) {
		this.store.dispatch(new SingleExpenseLoadedAction(expense));
		this.router.navigate(['/', 'home', 'expenses', expense.key]);
	}

}
