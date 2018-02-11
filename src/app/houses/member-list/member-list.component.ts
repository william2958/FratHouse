import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BasicUser, User} from "../../shared/models/user";
import {House} from "../../shared/models/house";
import {RemoveUserFromHouseAction} from "../../store/actions/houseActions";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../store/application-state";
import {Expense} from "../../shared/models/expense";
import * as _ from 'lodash';

@Component({
	selector: 'member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit, OnChanges {

	@Input() members: BasicUser[];
	@Input() house: House;
	@Input() user: User;
	@Input() owedExpenses: Expense[];
	@Input() outstandingExpenses: Expense[];

	outstandingValues = {};
	owedValues = {};

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['outstandingExpenses']) {
			if (changes['outstandingExpenses'].currentValue) {
				this.calculateOutstandingAmounts();
			}
		}
		if (changes['owedExpenses']) {
			if (changes['owedExpenses'].currentValue) {
				this.calculateOwedAmounts();
			}
		}
	}

	calculateOutstandingAmounts() {
		this.outstandingValues = {};
		for (const expense of this.outstandingExpenses) {
			for (const payerKey in expense.payers) {
				if (!expense.payers[payerKey].paid) {
					if (this.outstandingValues[payerKey]) {
						this.outstandingValues[payerKey] += expense.individualAmount;
					} else {
						this.outstandingValues[payerKey] = expense.individualAmount;
					}
				}
			}
		}
	}

	calculateOwedAmounts() {
		this.owedValues = {};
		for (const expense of this.owedExpenses) {
			this.owedValues[expense.payee] = expense.individualAmount;
		}
	}

	getOwedValueForMember(memberKey) {
		return this.owedValues[memberKey];
	}

	getOutstandingValueForMember(memberKey) {
		return this.outstandingValues[memberKey];
	}

	removeMember(member: BasicUser) {
		if (member && this.house) {
			this.store.dispatch(new RemoveUserFromHouseAction({
				user: member,
				houseKey: this.house.key
			}));
		}
	}

}
